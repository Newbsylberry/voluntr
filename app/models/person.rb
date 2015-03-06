class Person < ActiveRecord::Base
  has_many :organizations, through: :organization_people
end
