class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :description
  has_many :events
  has_many :posts
  has_many :organization_people
  has_many :people, through: :organization_people



end
