class OrganizationMailingServiceSerializer < ActiveModel::Serializer
  attributes :id, :organization_id, :token, :service_type, :default_list_id, :default_list, :mailing_service_lists


end
