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
  has_many :mailing_service_lists, through: :organization_mailing_services
  require 'carrierwave/orm/activerecord'
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  validates :custom_url, uniqueness: true
  validates :name, uniqueness: true
  mount_uploader :terms_of_service_file, TermsOfServiceUploader
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

  def opportunities
    opportunities = [];
    OrganizationOpportunity.where(organization_id: id).each do |oo|
      if !opportunities.include?(oo)
        opportunities.push(Opportunity.find(oo.opportunity_id))
      end
    end
    Opportunity.where(organization_id: id).each do |o|
      if !opportunities.include?(o)
        opportunities.push(o)
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
    recorded_hours.sum(:hours)
  end

  def total_opportunities
    opportunities.count
  end

  def average_hours_recorded
    recorded_hours.average(:hours)
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
    @resource.name = "report"
    @recorded_hours_series = Hash.new
    @recorded_hours_series["name"] = "Recorded Hours"
    @recorded_hours_series["data"] = Array.new
    @organization_volunteers = []
    summary_graph = Hash.new
    summary_graph["Total Volunteers Added"] = Hash.new
    summary_graph["Total Recorded Hours"] = Hash.new
    @email_suffixes = []
    top_suffixes = ["gmail.com", "hotmail.com","aol.com","yahoo.com"]
    daily_statistics.where(date: start_date..end_date).each do |ds|
      summary_graph["Total Volunteers Added"][ds.date] = ds.total_added_volunteers
      summary_graph["Total Recorded Hours"][ds.date] = ds.total_recorded_hours
    end
    recorded_hours.where(date_recorded: start_date..end_date).each do |rh|
      if rh.person
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

    top_volunteers = @organization_volunteers.sort_by { |i| i[:hours] }.reverse!.take(10)
    top_suffixes = @email_suffixes.sort_by { |i| i[:hours] }.reverse!.take(10)



    pdf = OrganizationReportPdf.new(self, summary_graph, start_date, end_date, top_volunteers, top_suffixes)
    pdf.render_file "hello.pdf"

    @resource.resource = File.open("hello.pdf")
    @resource.resourceable = self
    @resource.save
    return @resource
  end


end
