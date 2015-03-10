class Organization < ActiveRecord::Base
  has_many :opportunities
  has_many :posts
  has_many :organization_people
  has_many :people, through: :organization_people
end
