class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :description, :address, :city, :state, :zip_code
  # has_many :opportunities
  has_many :posts
  has_many :organization_mailing_services






end
