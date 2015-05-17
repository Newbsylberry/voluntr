class PersonOpportunitiesController < ApplicationController
  include IceCube



  def create

    @person = Person.create_with(locked: false)
                  .find_or_initialize_by(email: params[:email])

    if !@person.persisted?
      @organization_person = OrganizationPerson.new
      @organization_person.person = @person
      @organization_person.organization = Opportunity.find(params[:opportunity_id]).organization
      @organization_person.save
    end

    @person.first_name = params[:first_name]
    @person.last_name = params[:last_name]
    @person.save


    @person_opportunity = PersonOpportunity.create_with(locked: false)
                              .find_or_initialize_by(person_id: @person.id, opportunity_id: params[:opportunity_id])


    @person_opportunity.person = @person




    if params[:start_time]
      schedule = Schedule.new(Time.at(params[:start_time].to_i / 1000))

      if params[:daily] == true && params[:repeat_count].blank?
        schedule.add_recurrence_rule Rule.daily
      elsif params[:daily] && !params[:repeat_count].blank?
        schedule.add_recurrence_rule Rule.daily(params[:repeat_count])
      end
      if params[:weekly] == true && params[:repeat_count].blank?
        schedule.add_recurrence_rule Rule.weekly.day(params[:repeat_days])
      elsif params[:weekly] && !params[:repeat_count].blank?
        schedule.add_recurrence_rule Rule.weekly(params[:repeat_count]).day(params[:repeat_days])
      end
      if params[:monthly] == true
        schedule.add_recurrence_rule Rule.monthly
      end
      if params[:yearly] == true
        schedule.add_recurrence_rule Rule.yearly
      end
      @person_opportunity.schedule = schedule.to_yaml
    end


    @person_opportunity.save

    if @person_opportunity.person.email
    OpportunityMailer.opportunity_registration_email(@person_opportunity.person.email,
                                                     Opportunity.find(@person_opportunity.opportunity_id)).deliver
    end

    respond_with @person_opportunity
    end




    private

    def person_opportunity_params
      params.require(:person_opportunity).permit(:person_id, :opportunity_id, :schedule)
    end

    end


