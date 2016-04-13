class PersonSerializer < ActiveModel::Serializer
  # need to get rid of schedule update form settings
  attributes :id, :fb_id, :first_name, :last_name, :email, :opportunity_hours, :opportunity_role,
  :opportunity_photo_consent, :total_recorded_hours, :address_1,:address_2, :city, :state,
             :zip_code, :phone, :contact_information_completed?, :count, :organization_name, :occupation,
             :schedule_update_form_settings

  def count
    @options[:count]
  end



end