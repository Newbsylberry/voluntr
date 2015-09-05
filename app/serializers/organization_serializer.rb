class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :description, :address, :city, :state, :zip_code, :custom_url, :website_url, :facebook_url,
             :twitter_url, :instagram_url, :total_people
  # has_many :opportunities
  has_many :posts
  has_many :organization_mailing_services
  has_many :opportunities






end
