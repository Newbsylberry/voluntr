class OpportunityMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def opportunity_registration_email(email, opportunity)
    @email = email
    @opportunity = opportunity
    @organization = Organization.find(opportunity.organization_id)

    mail(to: email, subject: "Thanks for registering for #{@opportunity.name}")
  end

  def opportunity_sign_in_email(person, opportunity, recorded_hours)
    @person = person
    @opportunity = opportunity
    @recorded_hours = recorded_hours


    mail(to: @person.email, subject: "Sign In Confirmation")
  end



end
