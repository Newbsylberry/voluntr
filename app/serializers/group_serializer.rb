class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :city, :state, :recorded_hours
  has_many :recorded_hours
end
