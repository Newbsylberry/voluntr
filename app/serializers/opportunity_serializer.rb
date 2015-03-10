class OpportunitySerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :start_time, :end_time, :location, :longitude, :latitude, :description,
             :opportunity_type_id
end
