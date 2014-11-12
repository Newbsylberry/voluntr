class UserEventHourSerializer < ActiveModel::Serializer
  attributes :id, :event_id, :hours, :description
end
