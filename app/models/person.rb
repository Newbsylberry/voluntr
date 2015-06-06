class Person < ActiveRecord::Base
  has_many :organizations, through: :organization_people
  has_many :person_opportunities
  has_many :opportunities, through: :person_opportunities

  validates :email, uniqueness: true

  def self.import(csv)

  end



end

