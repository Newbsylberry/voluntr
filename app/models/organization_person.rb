class OrganizationPerson < ActiveRecord::Base
  belongs_to :organization
  belongs_to :person

  validates :person_id, uniqueness: { scope: :organization_id }

  def subscribed_to_list?(list_id)
    hash = Digest::MD5.hexdigest(person.email)
    if Mailchimp.api(organization.organization_mailing_services
                         .find_by_service_type('mail_chimp').token).
        get("lists/#{list_id}/members/#{hash}").response.status < 400
      return true
    else
      return false
    end
  end




  def add_to_lists(lists)
    if self.person.email &&
        !lists.nil?
      member = Hash.new
      member["status"] = "subscribed"
      member["email_address"] = person.email
      member["status"] = "subscribed"
      member["merge_fields"] = Hash.new;
      member["merge_fields"]["FNAME"] = person.first_name
      member["merge_fields"]["LNAME"] = person.last_name
      added_lists = Array.new
      lists.each do |list|
          if !list.nil? && !self.subscribed_to_list?(list.list_id)
            response = Mailchimp.api(organization.organization_mailing_services
                              .find_by_service_type('mail_chimp').token).
                post("lists/#{list.list_id}/members/", {body: member.to_json})
            added_lists << list
          end
      end
      return added_lists
    end
  end

  def send_registration_confirmation
    if self.person.email
      PersonOrganizationMailer.registration_confirmation_email(organization, person).deliver
    end
  end

end
