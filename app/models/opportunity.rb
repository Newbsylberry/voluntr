class Opportunity < ActiveRecord::Base
  require "prawn"
  require "json"
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")
  require 'gchart'
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  has_many :organization_opportunities
  has_many :resources, as: :resourceable, dependent: :destroy
  has_many :opportunities
  has_many :person_opportunities, dependent: :destroy
  has_many :people, through: :person_opportunities
  has_many :opportunity_roles, dependent: :destroy
  has_many :recorded_hours, dependent: :destroy
  has_many :opportunity_instances
  has_many :groups, through: :recorded_hours
  belongs_to :organization
  has_many :organization_email_templates, through: :organization
  geocoded_by :full_street_address   # can also be an IP address
  attr_accessor :end, :start, :allDay, :timezone, :duration, :title, :instance_hours, :instance_people_count
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }          # auto-fetch coordinates

  after_initialize do |opportunity|
    if opportunity.new_record?
      opportunity.schedules = Array.new;
    end
  end


  # BEGIN SERIALIZEER

  def schedule_to_string
    if self.schedule
      IceCube::Schedule.from_yaml(schedule).rrules.each do |r|
        return r.to_s
      end
    end
  end

  def organizations
    organizations = []
    organization_opportunities.each do |oo|
      organizations << Organization.find(oo.organization_id)
    end
    return organizations
  end

  def add_organization(organization)
    ap self
    @organization_opportunity = OrganizationOpportunity.new(
        organization_id: organization[:id],
        opportunity_id: self.id)
    @organization_opportunity.administrator = organization[:administrator]
    @organization_opportunity.save
  end

  def selected_instance_people_recording
    if @options[:instance_date]
      recorded_hours.where(:date_recorded => Time.at(@options[:instance_date].to_i / 1000)
                                                 .beginning_of_day..
                               Time.at(@options[:instance_date].to_i / 1000).end_of_day)
          .select(:person_id).map(&:person_id).uniq.count
    end

  end

  def signed_up_volunteers
    @instance_volunteers = Array.new
    if self.start_schedule

      person_opportunities.each do |p|

        if p.schedule
          schedule = IceCube::Schedule.from_yaml(p.schedule)

          if schedule.occurs_on?(Time.at(@options[:instance_date].to_i / 1000))

            @instance_volunteers.push(Person.find(p.person_id))
          end
        else
          @instance_volunteers.push(Person.find(p.person_id))
        end

      end
    elsif !self.start_schedule
      person_opportunities.each do |p|
        @instance_volunteers.push(Person.find(p.person_id))
      end
    end
    return @instance_volunteers
  end

  def signed_up_volunteer_count
    signed_up_volunteers.count
  end



  def ical
    if self.schedule
      keys = Array.new
      values = Array.new
      if !schedule.nil?
        IceCube::Schedule.from_yaml(schedule).rrules.each do |r|
          r.to_ical.split(';').each do |s|
            s.split("=").map.with_index do |item, index|
              if index == 0
                keys.push(item)
              else
                values.push(item)
              end
            end
          end
        end
        parsed_rules = Hash[keys.zip(values.map {|i| i})]
        # if parsed_rules["FREQ"] == "WEEKLY"
        # repeat_days = Array.new
        # parsed_rules['BYDAY'].split(',').each do |d|
        #   repeat_days.push(d)
        # end
        # parsed_rules[:BYDAY] = repeat_days
        # puts parsed_rules.as_json
        # return parsed_rules.as_json
        # end
      end
    end
  end

  # END SERIALIZER




  # This method combines all address information into one readable full address
  def full_street_address
    return "#{address} #{city} #{state} #{zip_code}"
  end

  # This is the start_time for the opportunity, required by full calendar.js
  def start_time
    if schedule
      return IceCube::Schedule.from_yaml(schedule).start_time
    end
  end

  # this is the duration for the opportunity, determined by IceCube
  def duration
    if schedule
      return IceCube::Schedule.from_yaml(schedule).duration / (60*60)
    end
  end

  # This calculates the sum of all recorded hours for an opportunity
  def total_recorded_hours
    recorded_hours.sum(:hours)
  end

  # The hours for a particular instance THIS SHOULD BE DEPRECATED in favor of an OpportunityInstance method
  def instance_recorded_hours(date)
    recorded_hours.where(:date_recorded => Time.at(date.to_i / 1000 )
                                               .beginning_of_day..Time.at(date.to_i / 1000 ).end_of_day).sum(:hours)
  end


  # These are the volunteers who have registered or participated in an opportunity
  def volunteers
    @opportunity_volunteers = Array.new
    person_opportunities.each do |p|
      @opportunity_volunteers.push(Person.find(p.person_id))
    end
    recorded_hours.each do |rh|
      if rh.person
        if @opportunity_volunteers.include?(rh.person)
          existing_volunteers = @opportunity_volunteers.select { |ov| ov.id == rh.person_id }
          existing_volunteers.each do |ev|
            if ev.opportunity_hours
              ev.opportunity_hours += rh.hours
            else
              ev.opportunity_hours = rh.hours
            end
          end
        else
          rh.person.opportunity_hours = rh.hours
          if rh.opportunity_role
            rh.person.opportunity_role = rh.opportunity_role.name
          end
          @opportunity_volunteers.push(rh.person)
        end
      end
    end
    return @opportunity_volunteers
  end


  # This is the total number of people who have recorded hours at an opportunity
  def total_people_recording
    recorded_hours.select(:person_id).map(&:person_id).uniq.count
  end

  # This is the total number of people who have recorded hours at an opportunity instance SHOULD BE DEPRECATED
  def instance_people_recording(date)
    recorded_hours.where(:date_recorded => Time.at(date.to_i / 1000 )
                                               .beginning_of_day..Time.at(date.to_i / 1000 ).end_of_day)
        .select(:person_id).map(&:person_id).uniq.count
  end

  # These are the statistics for all the instances of an opportunity
  def instances_statistics
    @opportunities = Array.new
    IceCube::Schedule.from_yaml(schedule).occurrences(Time.now).each do |occ|
      @instance = Opportunity.new
      @instance.start_time = occ.start_time
      @instance.end_time = occ.end_time
      @instance.duration = occ.duration
      @instance.instance_hours = instance_recorded_hours(occ.start_time.to_s)
      @instance.instance_people_count = instance_people_recording(occ.start_time.to_s)
      @opportunities.push(@instance)
    end
    return @opportunities
  end

  # This function generates a report for an opportunity instance
  def generate_report(start_date, end_date)
    @resource = Resource.new
    @resource.name = "report"
    @recorded_hours_series = Hash.new
    @recorded_hours_series["name"] = "Recorded Hours"
    @recorded_hours_series["data"] = Array.new

    @data = Array.new
    @opportunity_volunteers = []
    @email_suffixes = []
    top_suffixes = ["gmail.com", "hotmail.com","aol.com","yahoo.com"]
    recorded_hours.where(date_recorded: start_date..end_date).each do |rh|
      @data.push(rh.hours)
      if rh.person
        existing_volunteer = @opportunity_volunteers.find { |ov| ov[:id] == rh.person_id }
        if existing_volunteer
            existing_volunteer[:hours] += rh.hours
        else
          @opportunity_volunteers.push({
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

    top_volunteers = @opportunity_volunteers.sort_by { |i| i[:hours] }.reverse!.take(10)
    top_suffixes = @email_suffixes.sort_by { |i| i[:hours] }.reverse!.take(10)

    recorded_hours = "#{name}_recorded_hours.png"
    Gchart.line(:size => '500x300',
                :title => "Timeline of Recorded Hours at #{name}",
                :bg => 'FFFFFF',
                :data => @data,
                :format => 'file',
                :axis_with_labels => 'y',
                :line_colors => '35c0ff',
                :axis_labels => ['0|2|4|6|8|10'],
                :filename => recorded_hours)



    # This is the pie chart for roles
    @opportunity_roles_series = Hash.new
    @opportunity_roles_series["name"] = "Opportunity Roles"
    @opportunity_roles_series["data"] = Array.new
    opportunity_roles_options = {
        title: {
            text: "Hours Per Role Between #{DateTime.parse(start_date.to_s).strftime("%b/%d/%Y")} and #{DateTime.parse(end_date.to_s).strftime("%b/%d/%Y")}"
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
    opportunity_roles_options["series"] = Array.new
    if !opportunity_roles.empty?
      opportunity_roles.each do |opr|
        @opportunity_roles_series["data"].push({name: "#{opr.name}", y: opr.total_recorded_hours})
      end
    end

    opportunity_roles_options["series"].push(@opportunity_roles_series)
    opportunity_roles = "#{name}_opportunity_hours.png"
    open(opportunity_roles, 'wb') do |file|
      file << open("http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(opportunity_roles_options))}").read
    end



    # This is the pie chart for groups
    @opportunity_groups_series = Hash.new
    @opportunity_groups_series["name"] = "Opportunity Roles"
    @opportunity_groups_series["data"] = Array.new
    opportunity_groups_options = {
        title: {
            text: "Groups Between #{DateTime.parse(start_date.to_s).strftime("%b/%d/%Y")} and #{DateTime.parse(end_date.to_s).strftime("%b/%d/%Y")}"
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
    opportunity_groups_options["series"] = Array.new
    if !groups.empty?
      groups.each do |opg|
        @opportunity_groups_series["data"].push({name: "#{opg.name}", y: opg.total_recorded_hours})
      end
    end

    opportunity_groups_options["series"].push(@opportunity_groups_series)
    opportunity_groups = "#{name}_groups_opportunity_hours.png"
    open(opportunity_groups, 'wb') do |file|
      file << open("http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(opportunity_groups_options))}").read
    end


    pdf = OpportunityReportPdf.new(self, recorded_hours, opportunity_roles, opportunity_groups, start_date, end_date, top_volunteers, top_suffixes)
    pdf.render_file "hello.pdf"

    @resource.resource = File.open("hello.pdf")
    @resource.resourceable = self
    @resource.save
    return @resource
  end


  # This method deletes only an instance of an opportunity
  def delete_instance(instance)
    if !schedule.blank?
      current_schedule = IceCube::Schedule.from_yaml(schedule)

      current_schedule.add_exception_time(Time.at(DateTime.parse(instance)))
      self.schedule = current_schedule.to_yaml
      self.save
    end
  end

  # This method deletes only an instance of an opportunity
  def delete_future_instances(date)
    if !schedule.blank?
      current_schedule = IceCube::Schedule.from_yaml(schedule)

      current_schedule.rrules.each do |rr|
        rr.until(Time.at(DateTime.parse(date)))
      end
      self.schedule = current_schedule.to_yaml
      self.save
    end
  end

  def instances
    return SchedulerTool.list_of_instances(self, start_time, start_time + 1.year)
  end








end
