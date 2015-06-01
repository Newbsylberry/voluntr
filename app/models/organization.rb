class Organization < ActiveRecord::Base
  has_many :opportunities
  has_many :posts
  has_many :organization_people
  has_many :recorded_hours
  has_many :daily_statistics
  has_many :people, through: :organization_people
  has_many :organization_email_templates


  after_create do |organization|
    OrganizationEmailType.all.each do |oet|
      template = oet.organization_email_templates.new

      template.organization_id = organization.id
      template.save
    end
  end
end
