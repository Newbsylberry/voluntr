class OrganizationMailingServiceSerializer < ActiveModel::Serializer
  attributes :id, :organization_id, :token, :service_type, :default_list_id, :default_list
  has_many :mailing_service_lists

  def default_list
    if default_list_id
      @mailing_list = MailingServiceList.find(default_list_id)
    end
  end

end
