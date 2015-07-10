class OrganizationMailingService < ActiveRecord::Base
  belongs_to :organization
  has_many :mailing_service_lists, dependent: :destroy

  def update_or_create_lists
    if service_type == "mail_chimp"
      response = Mailchimp.api(token).get('lists/')
      JSON.parse(response.body)["lists"].each do |l|
        @list = MailingServiceList.create_with(locked: false).
            find_or_initialize_by(organization_mailing_service_id: id,
                                   list_id: l["id"],
                                   name: l["name"],
                                   current_subscribers: l["stats"]["member_count"])
        @list.save
        mailing_service_lists.push(@list)
      end
    end
  end

end
