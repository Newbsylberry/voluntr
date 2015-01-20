class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :fb_id
  has_many :events
end
