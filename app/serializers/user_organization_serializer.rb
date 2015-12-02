class UserOrganizationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :organization_id
end
