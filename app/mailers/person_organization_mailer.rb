class PersonOrganizationMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def registration_confirmation_email(organization, person)
    @email = person.email
    @organization = organization
    user_emails = []
    @organization.users.each do |user|
      if user.email
        user_emails << user.email
      end
    end
    @person = Person.find(person.id)
    @scrambled_id = Base64.encode64(@person.id.to_s)
    @link = "http://www.voluapp.com/#/#{@organization.custom_url}/registration/2?token=#{@scrambled_id}"

    mail(to: @email, from: user_emails, subject: "Thanks for registering with #{@organization.name}")
  end


end
