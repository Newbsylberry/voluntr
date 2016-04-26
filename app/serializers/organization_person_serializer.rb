class OrganizationPersonSerializer < ActiveModel::Serializer
  attributes :id, :organization, :notes, :recorded_hours, :resources
  has_one :person



end