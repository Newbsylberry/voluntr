class OpportunityMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def opportunity_registration_email(email, person_opportunity)
    @email = email
    @person_opportunity = person_opportunity

    mail(to: email, subject: "Thanks for registering for #{@person_opportunity.opportunity.name}")
  end

  def upcoming_opportunities_information(person, person_opportunities)
    @person = person
    @person_opportunities = person_opportunities

    mail(to: @person.email, subject: "Your Volunteer Opportunities Next Month")
  end

  def opportunity_sign_in_email(person, opportunity, recorded_hours)
    @person = person
    @opportunity = opportunity
    @recorded_hours = recorded_hours


    mail(to: @person.email, subject: "Sign In Confirmation")
  end
end
