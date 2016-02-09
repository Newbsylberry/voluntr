class Organization < ActiveRecord::Base
  belongs_to :organization_type
  has_many :opportunities
  has_many :posts
  has_many :organization_people
  has_many :user_organizations
  has_many :users, through: :user_organizations
  has_many :recorded_hours
  has_many :daily_statistics
  has_many :people, through: :organization_people
  has_many :organization_email_templates
  has_many :organization_mailing_services
  has_many :mailing_service_lists, through: :organization_mailing_services
  require 'carrierwave/orm/activerecord'
  validates :custom_url, uniqueness: true
  mount_uploader :terms_of_service_file, TermsOfServiceUploader
  geocoded_by :full_street_address   # can also be an IP address
  after_validation :geocode



  after_initialize do |organization|
    if organization.new_record?
      OrganizationEmailType.all.each do |oet|
        template = oet.organization_email_templates.new

        template.organization_id = organization.id
        template.save
      end
      o = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
      organization.custom_url = (0...16).map { o[rand(o.length)] }.join
      organization.organization_type = OrganizationType.find_by_name('Nonprofit')
      organization.save
    end
  end

  def default_list(service_type)
    if !organization_mailing_services.empty?
      return MailingServiceList.find(self.organization_mailing_services.
                                         find_by_service_type(service_type).default_list_id)
    end
  end

  def full_street_address
    return "#{address_1} #{address_2} #{city} #{state} #{zip_code}"
  end

  def total_people
    self.people.count
  end

  def total_recorded_hours
    recorded_hours.sum(:hours)
  end

  def total_opportunities
    opportunities.count
  end

  def average_hours_recorded
    recorded_hours.average(:hours)
  end

  def terms_of_service_uploaded
    if !terms_of_service_file.blank?
      true
    else
      false
    end
  end

  def nonprofit?
    if organization_type.name === 'Nonprofit'
      true
    else
      false
    end
  end

  def volunteer_group?
    if organization_type.name === 'Volunteer Group'
      true
    else
      false
    end
  end


end
