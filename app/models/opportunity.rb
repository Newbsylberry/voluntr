class Opportunity < ActiveRecord::Base
  has_many :user_event_hours
  has_many :opportunities
  has_many :person_opportunities
  has_many :people, through: :person_opportunities
  has_many :opportunity_roles
  has_many :recorded_hours
  belongs_to :organization
  has_many :object_schedules, as: :scheduleable
  has_many :organization_email_templates, through: :organization
  attr_accessor :end, :start, :allDay, :timezone, :duration, :title, :instance_hours, :instance_people_count

  def start_time
    return IceCube::Schedule.from_yaml(object_schedules.first.schedule).start_time
  end

  def duration
    return IceCube::Schedule.from_yaml(object_schedules.first.schedule).duration / (60*60)
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
    recorded_hours.each do |d|
      if d.person
        if @opportunity_volunteers.include?(d.person)
          existing_volunteers = @opportunity_volunteers.select { |ov| ov.id == d.person_id }
          existing_volunteers.each do |ev|
            if ev.opportunity_hours
              ev.opportunity_hours += d.hours
            else
              ev.opportunity_hours = d.hours
            end
          end
        else
          d.person.opportunity_hours = d.hours
          d.person.opportunity_role = d.hours.opportunity_role.name
          @opportunity_volunteers.push(d.person)
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
    IceCube::Schedule.from_yaml(object_schedules.last.schedule).occurrences(Time.now).each do |occ|
      @instance = Opportunity.new
      @instance.object_schedules << object_schedules
      @instance.start_time = occ.start_time
      @instance.end_time = occ.end_time
      @instance.duration = occ.duration
      @instance.instance_hours = instance_recorded_hours(occ.start_time.to_s)
      @instance.instance_people_count = instance_people_recording(occ.start_time.to_s)
      @opportunities.push(@instance)
    end
    return @opportunities
  end







end
