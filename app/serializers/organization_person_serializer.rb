class OrganizationPersonSerializer < ActiveModel::Serializer
  attributes :id, :organization, :notes
  has_one :person



end