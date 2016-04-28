class PersonOrganizationMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def registration_confirmation_email(organization, person)
    @email = person.email
    @organization = organization
    @person = Person.find(person.id)
    @scrambled_id = Base64.encode64(@person.id.to_s)
    @link = "http://www.voluapp.com/#/#{@organization.custom_url}/registration/2?token=#{@scrambled_id}"
    @from_emails = []

    @organization.users.each do |u|
      if u.email
        @from_emails << u.email
      end
    end

    if !@organization.resources.empty?
      @organization.resources.each do |resource|
        if !resource.resource_type.nil? && resource.resource_type.name = "For Volunteers"
          attachments["#{resource.name}"] = open(resource.resource.url).read
        end
      end
    end


    mail(to: @email, reply_to: @from_emails, subject: "Thanks for registering with #{@organization.name}")
  end


end
