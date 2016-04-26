class Organization < ActiveRecord::Base
  belongs_to :organization_type
  has_many :organization_opportunities, dependent: :destroy
  has_many :resources, as: :resourceable, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :organization_people, dependent: :destroy
  has_many :user_organizations
  has_many :users, through: :user_organizations
  has_many :recorded_hours
  has_many :daily_statistics, dependent: :destroy
  has_many :people, through: :organization_people
  has_many :organization_email_templates, dependent: :destroy
  has_many :organization_mailing_services, dependent: :destroy
  has_many :opportunities, dependent: :destroy
  has_many :mailing_service_lists, through: :organization_mailing_services
  require 'carrierwave/orm/activerecord'
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  validates :custom_url, uniqueness: true
  validates :name, uniqueness: true
  mount_uploader :terms_of_service_file, TermsOfServiceUploader
  mount_uploader :picture, PictureUploader
  geocoded_by :full_street_address   # can also be an IP address
  after_validation :geocode

  after_initialize do |organization|
    if organization.new_record?
      OrganizationEmailType.all.each do |oet|
        template = oet.organization_email_templates.new
        template.organization_id = organization.id
        template.save
      end
      o = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
      organization.custom_url = (0...16).map { o[rand(o.length)] }.join
      organization.organization_type = OrganizationType.find_by_name('Nonprofit')
      organization.save
    end
  end

  def organization_recorded_hours
    @current_organization_recorded_hours = Array.new
    if organization_type.name === 'Nonprofit'
      opportunities.each do |o|
        o.recorded_hours.each do |rh|
          @current_organization_recorded_hours.push(rh)
        end
      end
    elsif organization_type.name === 'Volunteer Group'
      recorded_hours.each do |rh|
        @current_organization_recorded_hours.push(rh)
      end
    end
    return @current_organization_recorded_hours
  end

  def opportunities
    opportunities = [];
    OrganizationOpportunity.where(organization_id: id).each do |oo|
      if !opportunities.include?(oo)
        opportunities.push(Opportunity.find(oo.opportunity_id))
      end
    end
    if organization_type.name === "Nonprofit"
      Opportunity.where(organization_id: id).each do |o|
        if !opportunities.include?(o)
          opportunities.push(o)
        end
      end
    elsif organization_type.name === "Volunteer Group"
      recorded_hours.each do |rh|
        if rh.opportunity && !opportunities.include?(rh.opportunity)
          opportunities << rh.opportunity
        end
      end
    end
    return opportunities
  end

  def public_opportunities
    return Opportunity.where(organization_id: id, collaborative: true)
  end

  def default_list(service_type)
    if !organization_mailing_services.empty?
      return MailingServiceList.find(self.organization_mailing_services.
                                         find_by_service_type(service_type).default_list_id)
    end
  end

  def associated_organizations
    organizations = [];
    opportunities.each do |o|
      OrganizationOpportunity.where(opportunity_id: o.id).each do |org_opp|
        if org_opp.organization != self && !organizations.include?(org_opp.organization)
          organizations.push(org_opp.organization)
        end
      end
    end
    return organizations
  end

  def full_street_address
    return "#{address_1} #{address_2} #{city} #{state} #{zip_code}"
  end

  def total_people
    self.people.count
  end

  def total_recorded_hours
    total_recorded_hours = 0
    organization_recorded_hours.each do |rh|
      if rh.hours
        total_recorded_hours += rh.hours
      end
    end
    return total_recorded_hours
  end

  def total_opportunities
    return opportunities.count
  end

  def average_hours_recorded
    return total_recorded_hours / organization_recorded_hours.count
  end

  def terms_of_service_uploaded
    if !terms_of_service_file.blank?
      true
    else
      false
    end
  end

  def nonprofit?
    if organization_type.name === 'Nonprofit'
      true
    else
      false
    end
  end

  def volunteer_group?
    if organization_type.name === 'Volunteer Group'
      true
    else
      false
    end
  end

  # This function generates a report for an opportunity instance
  def generate_report(start_date, end_date)
    @resource = Resource.new
    @resource.name = "report - #{Time.now.strftime("%T - %m/%e/%Y")}"
    @recorded_hours_series = Hash.new
    @recorded_hours_series["name"] = "Recorded Hours"
    @recorded_hours_series["data"] = Array.new
    @organization_volunteers = []
    @volunteer_table = []
    @top_opportunities = []
    @volunteer_table << ["Name", "Email", "Organization","Opportunity","Instance","Hours"]
    @opportunities_table = []
    if organization_type.name === "Volunteer Group"
      @opportunities_table << ["Opportunity Name", "Organization Name", "Organization Contact","# of Volunteers","Total Hours"]
    elsif organization_type.name === "Nonprofit"
      @opportunities_table << ["Opportunity Name","# of Volunteers","Total Hours"]
    end

    @total_hours = 0
    summary_graph = Hash.new
    summary_graph["Total Volunteers Added"] = Hash.new
    summary_graph["Total Recorded Hours"] = Hash.new
    @email_suffixes = []
    top_suffixes = ["gmail.com", "hotmail.com","aol.com","yahoo.com"]
    daily_statistics.where(date: start_date..end_date).each do |ds|
      summary_graph["Total Volunteers Added"][ds.date.strftime("%m/%e")] = ds.total_added_volunteers
      summary_graph["Total Recorded Hours"][ds.date.strftime("%m/%e")] = ds.total_recorded_hours
    end
    organization_recorded_hours.each do |rh|
      if rh.hours && rh.person && rh.instance && (start_date..end_date).cover?(rh.instance)
        @total_hours += rh.hours
        if rh.opportunity && !rh.opportunity.nil?
          opportunity_name = "#{rh.opportunity.name.to_s}"
        else
          opportunity_name = "No Opportunity Name"
        end
        if organization_type.name === "Nonprofit"
          if rh.organization && !rh.organization.nil?
            organization_name = "#{rh.organization.name.to_s}"
          else
            organization_name = "No Organization"
          end
        elsif organization_type.name === "Volunteer Group"
          if rh.opportunity && Opportunity.exists?(id: rh.opportunity.id) && rh.opportunity.organization && Organization.exists?(id: rh.opportunity.organization.id)
            organization_name = "#{rh.opportunity.organization.name.to_s}"
          else
            organization_name = "No Organization"
          end
        end
        if !rh.person.first_name.nil?
          person_first_name = "#{rh.person.first_name}"
        else
          person_first_name = ""
        end
        if !rh.person.last_name.nil?
          person_last_name = "#{rh.person.last_name}"
        else
          person_last_name = ""
        end
        if !rh.person.email.nil?
          person_email = "#{rh.person.email}"
        else
          person_email = ""
        end
        if rh.instance
          instance = rh.instance.strftime("%I:%M%p - %m/%d/%Y")
        else
          instance = ""
        end
        @volunteer_table <<
            [
                "#{person_first_name} #{person_last_name}",
                person_email,
                organization_name,
                opportunity_name,
                instance,
                "#{rh.hours.to_f}"
            ]
        existing_volunteer = @organization_volunteers.find { |ov| ov[:id] == rh.person_id }
        if existing_volunteer
          existing_volunteer[:hours] += rh.hours
        else
          @organization_volunteers.push({
                                            id: rh.person_id,
                                            name: "#{rh.person.first_name} #{rh.person.last_name}",
                                            hours: rh.hours
                                        })
        end
        if rh.person.email
          existing_suffix = @email_suffixes.find { |es| es[:suffix] == rh.person.email.split("@").last }
          if existing_suffix && !top_suffixes.include?(existing_suffix[:suffix])
            existing_suffix[:hours] += rh.hours
          else
            @email_suffixes.push({
                                     suffix: rh.person.email.split("@").last,
                                     hours: rh.hours
                                 })
          end
        end
      end
    end

    # This is the pie chart for roles
    @opportunities_series = Hash.new
    @opportunities_series["name"] = "Opportunities"
    @opportunities_series["data"] = Array.new
    opportunities_options = {
        title: {
            text: ""
        },
        chart: {
            type: 'pie'
        },
        xAxis: {
            title: {
                text: 'Percentage'
            }
        }
    }
    opportunities_options["series"] = Array.new
    if !opportunities.empty?
      opportunities.each do |opr|
        @people = []
        total_recorded_hours = 0
        total_volunteers = 0
        if IceCube::Schedule.from_yaml(opr.schedule).occurs_between?(start_date, end_date)
          opr.recorded_hours.each do |rh|
            if rh.hours && (start_date..end_date).cover?(rh.instance) && (rh.organization_id === id || rh.opportunity.organization.id === id)
              total_recorded_hours += rh.hours
            end
            if rh.person && !@people.include?(rh.person)
              total_volunteers += 1
              @people << rh.person
            end
          end
        end
        if opr.name
          opportunity_name = "#{opr.name.to_s}"
        else
          opportunity_name = "No Opportunity Name"
        end
        if opr.organization && opr.organization.name
          organization_name = "#{opr.organization.name.to_s}"
        else
          organization_name = "No Organization Name"
        end
        if !opr.organization && !opr.organization.users.empty?
          ap opr.organization.users.first
          if opr.organization.users.first.email?
            contact_email = "#{opr.organization.users.first.email}"
          end
        else
          contact_email = ""
        end
        if organization_type.name === "Volunteer Group"
          @opportunities_table <<
              [
                  opportunity_name,
                  organization_name,
                  contact_email,
                  total_volunteers,
                  total_recorded_hours
              ]
        elsif organization_type.name === "Nonprofit"
          @opportunities_table <<
              [
                  opportunity_name,
                  total_volunteers,
                  total_recorded_hours
              ]
        end

        @top_opportunities << {name: "#{opr.name}", hours: total_recorded_hours}
        @opportunities_series["data"].push({name: "#{opr.name}", y: total_recorded_hours})
      end
    end

    opportunities_options["series"].push(@opportunities_series)
    opportunities = "#{name}_opportunity_hours.png"
    open(opportunities, 'wb') do |file|
      file << open("http://export.highcharts.com/?async=false&type=png&width=300&options=#{URI.encode(JSON.generate(opportunities_options))}").read
    end

    top_volunteers = @organization_volunteers.sort_by { |i| i[:hours] }.reverse!.take(10)
    top_suffixes = @email_suffixes.sort_by { |i| i[:hours] }.reverse!.take(10)



    pdf = OrganizationReportPdf.new(self,
                                    summary_graph,
                                    start_date,
                                    end_date,
                                    top_volunteers,
                                    top_suffixes,
                                    @organization_volunteers.count,
                                    @total_hours,
                                    @volunteer_table,
                                    opportunities,
                                    @top_opportunities.take(3),
                                    @opportunities_table)
    pdf.render_file "#{self.name} report #{Time.now.strftime("%m.%e.%Y.%H%M")}.pdf"

    @resource.resource = File.open("#{self.name} report #{Time.now.strftime("%m.%e.%Y.%H%M")}.pdf")
    @resource.resourceable = self
    @resource.save
    File.delete("#{self.name} report #{Time.now.strftime("%m.%e.%Y.%H%M")}.pdf")
    File.delete(opportunities)

    return @resource
  end


end
