class Group < ActiveRecord::Base
  has_many :recorded_hours
  has_many :people, through: :group_administrators
  has_many :people, through: :recorded_hours
  has_many :opportunities, through: :recorded_hours
  has_many :group_administrators

  def total_recorded_hours
    recorded_hours.sum(:hours)
  end

  def total_opportunities
    opportunities.count
  end

  def total_people
    people.count
  end




end

