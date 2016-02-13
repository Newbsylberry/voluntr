class OpportunitySerializer < ActiveModel::Serializer
  include IceCube
  attributes :id, :fb_id, :duration, :name, :organization_id, :start_time, :end_time, :location, :longitude, :latitude, :description,
             :opportunity_type_id, :start, :end, :title, :color, :allDay, :schedule,
             :schedule_to_string, :start_schedule, :ical, :address, :city, :state,
             :zip_code, :volunteer_goal, :organization_email_templates, :opportunity_roles,
             :total_recorded_hours, :total_people_recording,:instance_hours, :instance_people_count,
             :organization, :resources


end
