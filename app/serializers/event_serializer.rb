class EventSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :start_time, :end_time, :location, :longitude, :latitude, :description
end
