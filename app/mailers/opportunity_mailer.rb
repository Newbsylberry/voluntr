class OpportunityMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def opportunity_registration_email(email, person_opportunity)
    ap email
    @email = email
    @person_opportunity = person_opportunity
    @users_emails = Array.new
    @attachments = Array.new
    person_opportunity.opportunity.organization.users.each do |u|
      @users_emails << u.email
    end
    person_opportunity.opportunity.resources.each do |r|
      if r.resource_type && r.resource_type.name == "For Volunteers"
        @attachments << r
        attachments["#{r.name}"] = open(r.resource.url).read
      end
    end

    mail(to: @email, from: @users_emails, subject: "Thanks for registering for #{@person_opportunity.opportunity.name}")
  end

  def upcoming_opportunities_information(person, person_opportunities)
    @person = person
    @person_opportunities = person_opportunities

    mail(to: @person.email, subject: "Your Volunteer Opportunities Next Month")
  end

  def opportunity_collaboration_interest(opportunity, organization, message)
    @opportunity = opportunity
    @organization = organization
    @message = message
    opportunity_emails = [];
    organization_emails = [];
    @opportunity.organization.users.each do |u|
      opportunity_emails << u.email
    end
    @organization.users.each do |u|
      organization_emails << u.email
    end

    mail(to: opportunity_emails,
         from: organization_emails,
         subject: "#{@organization.name} wants to collaborate on #{@opportunity.name}")
  end

  def opportunity_sign_in_email(person, opportunity, recorded_hours)
    @person = person
    @opportunity = opportunity
    @recorded_hours = recorded_hours


    mail(to: @person.email, subject: "Sign In Confirmation")
  end



end
