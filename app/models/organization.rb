class Organization < ActiveRecord::Base
  has_many :opportunities
  has_many :posts
  has_many :organization_people
  has_many :recorded_hours
  has_many :daily_statistics
  has_many :people, through: :organization_people
  has_many :organization_email_templates
  has_many :organization_mailing_services
  has_many :mailing_service_lists, through: :organization_mailing_services


  after_create do |organization|
    OrganizationEmailType.all.each do |oet|
      template = oet.organization_email_templates.new

      template.organization_id = organization.id
      template.save
    end
  end
end
