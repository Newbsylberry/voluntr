class Opportunity < ActiveRecord::Base
  require "prawn"
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
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
    recorded_hours.where(:date_recorded => DateTime.parse(date)
                                               .beginning_of_day..DateTime.parse(date).end_of_day).sum(:hours)
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
    recorded_hours.where(:date_recorded => DateTime.parse(date)
                                               .beginning_of_day..DateTime.parse(date).end_of_day)
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

    # This is a line graph for recorded hours
    recorded_hour_options = {
        title: {
            text: "Recorded Hours Between #{DateTime.parse(start_date.to_s).strftime("%b/%d/%Y")} and #{DateTime.parse(end_date.to_s).strftime("%b/%d/%Y")}"
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        }
    }
    recorded_hour_options["series"] = Array.new
    recorded_hours.where(date_recorded: start_date..end_date).each do |h|
      @recorded_hours_series["data"].push([(DateTime.parse(h.date_recorded.to_s).to_f * 1000), h.hours])
    end

    recorded_hour_options["series"].push(@recorded_hours_series)

    recorded_hours = "#{name}_recorded_hour_chart.png"
    ap "http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(recorded_hour_options))}"
    open(recorded_hours, 'wb') do |file|
      file << open("http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(recorded_hour_options))}").read
    end


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
    ap "http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(opportunity_roles_options))}"
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


    pdf = OpportunityReportPdf.new(self, recorded_hours, opportunity_roles, opportunity_groups, start_date, end_date)
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








end
