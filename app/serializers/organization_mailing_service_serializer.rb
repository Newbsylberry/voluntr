class OrganizationMailingServiceSerializer < ActiveModel::Serializer
  attributes :id, :organization_id, :token
end
