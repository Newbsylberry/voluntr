class Opportunity < ActiveRecord::Base
  has_many :user_event_hours
  has_many :person_opportunities
  has_many :people, through: :person_opportunities
  has_many :recorded_hours
  belongs_to :organization
  has_many :object_schedules, as: :scheduleable


  def duration
    ((end_time.to_i - start_time.to_i) / 3600000).round
  end


end
