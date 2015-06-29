class OrganizationEmailTemplateSerializer < ActiveModel::Serializer
  attributes :id, :organization_email_type_id, :name, :description, :introduction_text,
             :marketing_materials, :upcoming_events, :upcoming_events_period, :conclusion_text
end
