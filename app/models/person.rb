class Person < ActiveRecord::Base
  has_many :organizations, through: :organization_people
  has_many :person_opportunities
  has_many :opportunities, through: :person_opportunities

  def self.import(csv)

  end


end
