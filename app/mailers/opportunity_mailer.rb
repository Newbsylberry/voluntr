class OpportunityMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def opportunity_registration_email(email, opportunity)
    @email = email
    @opportunity = opportunity
    @organization = Organization.find(opportunity.organization_id)

    mail(to: email, subject: "Thanks for registering for #{@opportunity.name}")
  end
end
