class MailingServiceListSerializer < ActiveModel::Serializer
  attributes :id, :organization_mailing_service_id, :name, :current_subscribers, :list_id
end
