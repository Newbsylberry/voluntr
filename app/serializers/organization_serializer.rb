class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :description, :address_1, :address_2, :city, :state, :zip_code, :custom_url, :website_url, :facebook_url,
             :twitter_url, :instagram_url, :total_people, :terms_of_service_file, :terms_of_service_uploaded,
             :nonprofit?, :volunteer_group?, :users, :picture

  has_many :organization_mailing_services
  has_many :opportunities







end
