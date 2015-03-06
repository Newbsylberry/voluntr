class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :description
  has_many :events
  has_many :posts
end
