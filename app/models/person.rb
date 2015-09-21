class Person < ActiveRecord::Base
  has_many :resources
  has_many :organization_people
  has_many :organizations, through: :organization_people
  has_many :person_opportunities
  has_many :opportunities, through: :person_opportunities
  has_many :recorded_hours
  has_many :groups, through: :group_administrators
  attr_accessor :opportunity_hours, :opportunity_instances_count, :opportunity_role, :opportunity_photo_consent
  validates :email, uniqueness: true, if: :email_present?
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")
  reverse_geocoded_by :latitude, :longitude do |obj,results|
    if geo = results.first
      obj.address_1 = geo.address.split(",")[0]
      obj.city    = geo.city
      obj.state    = geo.state
      obj.zip_code = geo.postal_code
    end
  end
  after_validation :reverse_geocode, :if => :has_coordinates?
  after_validation :geocode, :if => :has_location?, :unless => :has_coordinates?



  after_initialize do |person|
    if person.new_record?
      @schedules = Hash.new
      @schedules["morning_schedule"] = "---\n:start_time: &1 2015-07-13 06:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-13 12:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["afternoon_schedule"] = "---\n:start_time: &1 2015-07-13 12:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 18:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["night_schedule"] = "---\n:start_time: &1 2015-07-13 18:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-15 00:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      self.schedule = @schedules
    end
  end

  def has_coordinates?
    if !latitude.nil? && !longitude.nil?
      return true
    else
      return false
    end
  end

  def has_location?
    if !address_1.nil? && !city.nil? && !state.nil? && !zip_code.nil?
      return true
    else
      return false
    end
  end

  def email_present?
    if !email.nil?
      return true
    else
      return false
    end
  end

  def facebook_contact?
    if !fb_id.nil?
      true
    else
      false
    end
  end

  def contact_information_completed?
    if !email.blank? || !phone.blank?
      true
    else
      false
    end
  end

  def total_recorded_hours
    recorded_hours.sum(:hours)
  end

  def all_related_opportunities
    @all_related_opportunities = Array.new
    @opportunities = Array.new
    opportunities.each do |o|
      person_opportunity = PersonOpportunity.new
      person_opportunity.person = self
      person_opportunity.opportunity = o
      person_opportunity.total_hours = 0
      @all_related_opportunities << person_opportunity
      @opportunities.push(o)
    end
    recorded_hours.each do |rh|
      if rh.opportunity && !@opportunities.include?(rh.opportunity)
        person_opportunity = PersonOpportunity.new
        person_opportunity.person = self
        person_opportunity.total_hours = rh.hours
        person_opportunity.opportunity = rh.opportunity
        @all_related_opportunities << person_opportunity
        @opportunities << person_opportunity.opportunity
      elsif rh.opportunity && @opportunities.include?(rh.opportunity)
        existing_opportunities = @all_related_opportunities.select { |po| po.opportunity_id == rh.opportunity.id}
        existing_opportunities.each do |eo|
          eo.total_hours += rh.hours
        end
      end
    end
    return @all_related_opportunities
  end

  def add_to_organization(organization)
    @person_organization = OrganizationPerson.create_with(locked: false).
        find_or_initialize_by(person: self, organization: organization)
    if !organization.organization_mailing_services.empty? && !email.nil?
      @person_organization.add_to_lists(Array.new << organization.default_list("mail_chimp"))
    end
    if !@person_organization.persisted? && !email.nil?
      @person_organization.send_registration_confirmation
    end
    @person_organization.save
    @person_organization.__elasticsearch__.index_document
  end

  def update_schedule(params)
    @morning_schedule = Array.new
    @afternoon_schedule = Array.new
    @night_schedule = Array.new
    params[:schedule].each do |key, value|
      if key.to_s == "morning"
        hash = IceCube::Schedule.from_yaml(self.schedule["morning_schedule"]).to_hash
        hash[:rrules].each do |rr|
          rr[:validations][:day] = SchedulerTool.hash_array_loop(value, Array.new)
        end
        schedule["morning_schedule"] = IceCube::Schedule.from_hash(hash).to_yaml
      elsif key.to_s == "afternoon"
        hash = IceCube::Schedule.from_yaml(self.schedule["afternoon_schedule"]).to_hash
        hash[:rrules].each do |rr|
          rr[:validations][:day] = SchedulerTool.hash_array_loop(value, Array.new)
        end
        schedule["afternoon_schedule"] = IceCube::Schedule.from_hash(hash).to_yaml

      elsif key.to_s == "night"
        hash = IceCube::Schedule.from_yaml(self.schedule["night_schedule"]).to_hash
        hash[:rrules].each do |rr|
          rr[:validations][:day] = SchedulerTool.hash_array_loop(value, Array.new)
        end
        schedule["night_schedule"] = IceCube::Schedule.from_hash(hash).to_yaml
      end
    end
    self.save
  end

  def generate_report(start_date, end_date, organization)
    @resource = Resource.new
    @resource.name = "report"
    @recorded_hours_series = Hash.new
    @recorded_hours_series["name"] = "Recorded Hours"
    @recorded_hours_series["data"] = Array.new
    options = {
        title: {
            text: "Recorded Hours Summary Chart"
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        }
    }
    options["series"] = Array.new
    recorded_hours.where(date_recorded: start_date..end_date).each do |h|
      @recorded_hours_series["data"].push([(DateTime.parse(h.date_recorded.to_s).to_f * 1000), h.hours])
    end


    options["series"].push(@recorded_hours_series)

    file_name = "#{first_name}_#{last_name}_report.png"

    open(file_name, 'wb') do |file|
      file << open("http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(options))}").read
    end

    # pdf = Prawn::Document.generate("hello.pdf") do
    #   image file_name, position: :center
    # end

    pdf = PersonReportPdf.new(self, file_name, start_date, end_date, organization)

    pdf.render_file "hello.pdf"

    @resource.resource = File.open("hello.pdf")
    @resource.resourceable = self
    @resource.save

    return @resource
  end




end


