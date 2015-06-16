class Person < ActiveRecord::Base
  has_many :organizations, through: :organization_people
  has_many :person_opportunities
  has_many :opportunities, through: :person_opportunities

  attr_accessor :opportunity_hours, :opportunity_instances_count, :opportunity_role, :opportunity_photo_consent

  validates :email, uniqueness: true

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |person|
        csv << person.attributes.values_at(*column_names)
      end
    end
  end



end

