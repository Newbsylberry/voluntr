class PersonSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :first_name, :last_name, :email, :opportunity_hours, :opportunity_role,
  :opportunity_photo_consent, :total_recorded_hours, :address_1,:address_2, :city, :state,
             :zip_code





end