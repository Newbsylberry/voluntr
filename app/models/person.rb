class Person < ActiveRecord::Base
  has_many :organizations, through: :organization_people
  has_many :person_opportunities
  has_many :opportunities, through: :person_opportunities
  has_many :recorded_hours
  attr_accessor :opportunity_hours, :opportunity_instances_count, :opportunity_role, :opportunity_photo_consent

  validates :email, uniqueness: true

  def total_recorded_hours
    recorded_hours.sum(:hours)
  end



end

