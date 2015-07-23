class Opportunity < ActiveRecord::Base
  require "prawn"
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  has_many :user_event_hours
  has_many :resources, as: :resourceable
  has_many :opportunities
  has_many :person_opportunities
  has_many :people, through: :person_opportunities
  has_many :opportunity_roles
  has_many :recorded_hours
  belongs_to :organization
  has_many :organization_email_templates, through: :organization
  geocoded_by :full_street_address   # can also be an IP address
  attr_accessor :end, :start, :allDay, :timezone, :duration, :title, :instance_hours, :instance_people_count
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }          # auto-fetch coordinates

  def full_street_address
    return "#{address} #{city} #{state} #{zip_code}"
  end

  def start_time
    if schedule
      return IceCube::Schedule.from_yaml(schedule).start_time
    end
  end

  def duration
    if schedule
      return IceCube::Schedule.from_yaml(schedule).duration / (60*60)
    end
  end

  def total_recorded_hours
    recorded_hours.sum(:hours)
  end

  def instance_recorded_hours(date)
    recorded_hours.where(:date_recorded => DateTime.parse(date)
                                               .beginning_of_day..DateTime.parse(date).end_of_day).sum(:hours)
  end

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


  def total_people_recording
    recorded_hours.select(:person_id).map(&:person_id).uniq.count
  end

  def instance_people_recording(date)
    recorded_hours.where(:date_recorded => DateTime.parse(date)
                                               .beginning_of_day..DateTime.parse(date).end_of_day)
        .select(:person_id).map(&:person_id).uniq.count
  end

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

  def generate_report(start_date, end_date)
    @resource = Resource.new
    @resource.name = "report"
    @recorded_hours_series = Hash.new
    @recorded_hours_series["name"] = "Recorded Hours"
    @recorded_hours_series["data"] = Array.new
    @instance_hours_series = Hash.new
    @instance_hours_series["name"] = "Hours Recorded During Instance"
    @instance_hours_series["data"] = Array.new
    @instance_people_series = Hash.new
    @instance_people_series["name"] = "Hours Recorded During Instance"
    @instance_people_series["data"] = Array.new
    options = {
        title: {
            text: "Instance Summary Chart"
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
      @recorded_hours_series["data"].push([(DateTime.parse(i.end_time).to_f * 1000), h.hours])
    end

    instances_statistics.each do |i|
      if !i.end_time.nil?  && i.end_time  >= start_date && i.end_time <= end_date
        @instance_hours_series["data"].push([(DateTime.parse(i.end_time).to_f * 1000), i.instance_hours])
        @instance_people_series["data"].push([(DateTime.parse(i.end_time).to_f * 1000), i.instance_people_count])
      end
    end
    options["series"].push(@recorded_hours_series)
    options["series"].push(@instance_hours_series)
    options["series"].push(@instance_people_series)

    file_name = "#{name}_report.png"

    open(file_name, 'wb') do |file|
     file << open("http://export.highcharts.com/?async=false&type=png&width=500&options=#{URI.encode(JSON.generate(options))}").read
    end

    # pdf = Prawn::Document.generate("hello.pdf") do
    #   image file_name, position: :center
    # end

    pdf = OpportunityReportPdf.new(self, file_name, start_date, end_date)

    pdf.render_file "hello.pdf"

    @resource.resource = File.open("hello.pdf")
    @resource.resourceable = self
    @resource.save

    return @resource
  end

  # def as_indexed_json(options={})
  #   as_json(
  #       only: [:id, :first_name, :email],
  #       include: [:person]
  #   )
  # end







end
