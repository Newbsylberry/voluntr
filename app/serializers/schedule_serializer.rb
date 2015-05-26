class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :scheduleable_id, :scheduleable_type
end
