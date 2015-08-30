class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :city, :state, :recorded_hours, :total_recorded_hours,
             :total_opportunities, :total_people
  has_many :recorded_hours


end
