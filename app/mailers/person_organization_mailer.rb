class PersonOrganizationMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def registration_confirmation_email(organization, person)
    @email = person.email
    @organization = organization
    @person = Person.find(person.id)
    @scrambled_id = Base64.encode64(@person.id.to_s)
    @link = "http://www.voluapp.com/#/#{@organization.custom_url}/registration/2?person_token=#{@scrambled_id}"

    mail(to: @email, subject: "Thanks for registering with #{@organization.name}")
  end


end
