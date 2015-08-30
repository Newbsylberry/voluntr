class GroupAdministratorSerializer < ActiveModel::Serializer
  attributes :id, :person_id, :group_id
  has_one :person
  has_one :group
end
