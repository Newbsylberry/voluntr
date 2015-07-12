class OrganizationEmailTemplate < ActiveRecord::Base
  belongs_to :organization
  belongs_to :organization_email_type


  after_initialize do |oet|
    oet.introduction_text = oet.organization_email_type.introduction_text
    oet.conclusion_text = oet.organization_email_type.conclusion_text
    oet.marketing_materials = oet.organization_email_type.marketing_materials
    oet.upcoming_events = oet.organization_email_type.upcoming_events
  end
end
