class Opportunity < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  has_many :user_event_hours
  has_many :opportunities
  has_many :person_opportunities
  has_many :people, through: :person_opportunities
  has_many :opportunity_roles
  has_many :recorded_hours
  belongs_to :organization
  has_many :organization_email_templates, through: :organization
  attr_accessor :end, :start, :allDay, :timezone, :duration, :title, :instance_hours, :instance_people_count

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

  # def as_indexed_json(options={})
  #   as_json(
  #       only: [:id, :first_name, :email],
  #       include: [:person]
  #   )
  # end







end
