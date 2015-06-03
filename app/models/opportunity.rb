class Opportunity < ActiveRecord::Base
  has_many :user_event_hours
  has_many :person_opportunities
  has_many :people, through: :person_opportunities
  has_many :recorded_hours
  belongs_to :organization
  has_many :object_schedules, as: :scheduleable
  has_many :organization_email_templates, through: :organization
  attr_accessor :end, :start, :allDay, :timezone, :duration, :title

  def start_time
    return IceCube::Schedule.from_yaml(object_schedules.first.schedule).start_time
  end

  def duration
    return IceCube::Schedule.from_yaml(object_schedules.first.schedule).duration / (60*60)
  end







end
