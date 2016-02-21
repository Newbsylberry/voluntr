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
  scope :contact_information_completed, -> { where("email is NOT NULL and email != '' OR phone is NOT NULL and phone != ''") }



  after_initialize do |person|
    if person.new_record?
      @schedules = Hash.new
      @schedules["morning_schedule"] = "---\n:start_time: &1 2015-07-13 06:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-13 14:00:00.000000000 -04:00\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["afternoon_schedule"] = "---\n:start_time: &1 2015-07-13 12:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-13 20:00:00.000000000 -04:00\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["night_schedule"] = "---\n:start_time: &1 2015-07-13 18:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 01:59:00.000000000 -04:00\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
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

  def add_to_organization(organization, notes)
    @organization_person = OrganizationPerson.create_with(locked: false).
        find_or_initialize_by(person: self, organization: organization)
    @organization_person.notes = notes
    if !organization.organization_mailing_services.empty? && !email.nil?
      @organization_person.add_to_lists(Array.new << organization.default_list("mail_chimp"))
    end
    if !@organization_person.persisted? && !email.nil? && !email.blank?
      @organization_person.send_registration_confirmation
    end
    @daily_statistic = DailyStatistic.create_with(locked: false)
            .find_or_initialize_by(date: Time.now.beginning_of_day,
                                   organization_id: organization.id)
    if !@daily_statistic.persisted?
      @daily_statistic.total_added_volunteers = 1
    else
      @daily_statistic.total_added_volunteers += 1
    end
    @daily_statistic.save
    @organization_person.save
    @organization_person.__elasticsearch__.index_document
  end

  def self.find_or_create_from_params(params)
    ap params[:email]
    if params[:email]
      ap "Has email"
      person = self.create_with(locked: false)
                   .find_or_initialize_by(email: params[:email])
    elsif params[:phone]
      person = self.create_with(locked: false)
                   .find_or_initialize_by(phone: params[:phone])
    elsif params[:fb_id]
      person = self.create_with(locked: false)
                   .find_or_initialize_by(fb_id: params[:fb_id])
    else
      person = self.new
    end

    if person.new_record?
      person.assign_attributes(params)
      person.save
    end
    return person
  end

  def add_schedule(name, schedule)
    self.schedule["#{name}"] = schedule
    self.save
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

  def generate_report(start_date, end_date)
    @resource = Resource.new
    @resource.name = "report"
    # summary_graph = Hash.new
    # summary_graph["Recorded Hours"] = Hash.new
    # recorded_hours = recorded_hours.where(date: start_date..end_date).each do |rh|
    #   summary_graph["Recorded Hours"][rh.date_recorded] = rh.hours
    # end

    # This is the pie chart for roles
    # @opportunities_series = Hash.new
    # @opportunities_series["name"] = "#{first_name} #{last_name} Opportunities"
    # @opportunities_series["data"] = Array.new
    # opportunities_options = {
    #     title: {
    #         text: "#{first_name} #{last_name} Opportunities"
    #     },
    #     chart: {
    #         type: 'pie'
    #     },
    #     xAxis: {
    #         title: {
    #             text: 'Percentage'
    #         }
    #     }
    # }
    # opportunities_options["series"] = Array.new
    # if !opportunity_roles.empty?
    #   opportunity_roles.each do |opr|
    #     @opportunities_series["data"].push({name: "#{opr.name}", y: opr.total_recorded_hours})
    #   end
    # end
    # opportunities_options["series"].push(@opportunities_series)
    # opportunities_pie = "#{name}_opportunity_hours.png"
    # open(opportunities_pie, 'wb') do |file|
    #   file << open("http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(opportunities_options))}").read
    # end

    pdf = PersonReportPdf.new(self, start_date, end_date)
    pdf.render_file "hello.pdf"
    @resource.resource = File.open("hello.pdf")
    @resource.resourceable = self
    @resource.save

    return @resource
  end

  def availability_schedule(start_date, end_date)
    @availability_schedule = Array.new
    schedule.each do |k,v|
      if k == "morning_schedule"
        IceCube::Schedule.from_yaml(self.schedule["morning_schedule"]).to_hash[:rrules].each do |h|
          if !h[:validations].empty?
            IceCube::Schedule.from_yaml(v).occurrences_between(Time.parse(start_date.to_s), Time.parse(end_date.to_s)).each do |i|
              morning_instance =
                  {
                      id: 1,
                      title: "Morning Schedule",
                      start: i.start_time,
                      end: i.end_time,
                      color: '#FFEB3B'

                  }
              @availability_schedule.push(morning_instance)
            end
          end
        end
      elsif k == "afternoon_schedule"
        IceCube::Schedule.from_yaml(self.schedule["afternoon_schedule"]).to_hash[:rrules].each do |h|
          if !h[:validations].empty?
            IceCube::Schedule.from_yaml(v).occurrences_between(Time.parse(start_date.to_s), Time.parse(end_date.to_s)).each do |i|
              afternoon_instance =
                  {
                      id: 2,
                      title: "Afternoon Schedule",
                      start: i.start_time,
                      end: i.end_time,
                      color: '#4CAF50'
                  }
              @availability_schedule.push(afternoon_instance)
            end
          end
        end
      elsif k == "night_schedule"
        IceCube::Schedule.from_yaml(self.schedule["night_schedule"]).to_hash[:rrules].each do |h|
          if !h[:validations].empty?
            IceCube::Schedule.from_yaml(v).occurrences_between(Time.parse(start_date.to_s), Time.parse(end_date.to_s)).each do |i|
              evening_instance =
                  {
                      id: 3,
                      title: "Evening Schedule",
                      start: i.start_time,
                      end: i.end_time,
                      color: '#3F51B5'
                  }
              @availability_schedule.push(evening_instance)
            end
          end
        end
      else
        color = ['#f44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4',
                 '#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FFC107'].sample
        IceCube::Schedule.from_yaml(v).occurrences_between(Time.parse(start_date.to_s), Time.parse(end_date.to_s)).each do |i|
          custom_instance =
              {
                  id: 3,
                  title: k,
                  start: i.start_time,
                  end: i.end_time,
                  color: color
              }
          @availability_schedule.push(custom_instance)
        end
      end
    end
    return @availability_schedule
  end

  def schedule_update_form_settings
    @days = Array.new
    @morning = Hash.new
    @afternoon = Hash.new
    @night = Hash.new
    schedule.each do |k,v|
      if k == "morning_schedule"
        IceCube::Schedule.from_yaml(self.schedule["morning_schedule"]).to_hash[:rrules].each do |h|
          if !h[:validations].empty?
            IceCube::Schedule.from_yaml(v).occurrences_between(Time.now, Time.now + 7.days).each do |i|
              if i.wday == 0
                @morning["sunday"] = true
              elsif i.wday == 1
                @morning["monday"] = true
              elsif i.wday == 2
                @morning["tuesday"] = true
              elsif i.wday == 3
                @morning["wednesday"] = true
              elsif i.wday == 4
                @morning["thursday"] = true
              elsif i.wday == 5
                @morning["friday"] = true
              elsif i.wday == 6
                @morning["saturday"] = true
              end
            end
          end

        end

      elsif k == "afternoon_schedule"
        IceCube::Schedule.from_yaml(self.schedule["afternoon_schedule"]).to_hash[:rrules].each do |h|
          if !h[:validations].empty?
            IceCube::Schedule.from_yaml(v).occurrences_between(Time.now, Time.now + 7.days).each do |i|
              if i.wday == 0
                @afternoon["sunday"] = true
              elsif i.wday == 1
                @afternoon["monday"] = true
              elsif i.wday == 2
                @afternoon["tuesday"] = true
              elsif i.wday == 3
                @afternoon["wednesday"] = true
              elsif i.wday == 4
                @afternoon["thursday"] = true
              elsif i.wday == 5
                @afternoon["friday"] = true
              elsif i.wday == 6
                @afternoon["saturday"] = true
              end
            end
          end

        end

      elsif k == "night_schedule"
        IceCube::Schedule.from_yaml(self.schedule["night_schedule"]).to_hash[:rrules].each do |h|
          if !h[:validations].empty?
            IceCube::Schedule.from_yaml(v).occurrences_between(Time.now, Time.now + 7.days).each do |i|
              if i.wday == 0
                @night["sunday"] = true
              elsif i.wday == 1
                @night["monday"] = true
              elsif i.wday == 2
                @night["tuesday"] = true
              elsif i.wday == 3
                @night["wednesday"] = true
              elsif i.wday == 4
                @night["thursday"] = true
              elsif i.wday == 5
                @night["friday"] = true
              elsif i.wday == 6
                @night["saturday"] = true
              end
            end
          end
        end
      end
    end
    return {morning: @morning, afternoon: @afternoon, night: @night}
  end



end


