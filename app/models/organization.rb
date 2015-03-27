class Organization < ActiveRecord::Base
  has_many :opportunities
  has_many :posts
  has_many :organization_people
  has_many :person_opportunity_recorded_hours, through: :opportunities
  has_many :people, through: :organization_people
end
