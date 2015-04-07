class DailyStatisticSerializer < ActiveModel::Serializer
  attributes :id, :organization_id, :total_recorded_hours,
             :total_added_volunteers, :planned_hours, :date
end
