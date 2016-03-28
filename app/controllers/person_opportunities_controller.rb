class PersonOpportunitiesController < ApplicationController
  include IceCube



  def create
    ap params[:instances]
    person_params = {
        first_name: params[:first_name],
        last_name: params[:last_name],
        fb_id: params[:fb_id],
        phone: params[:phone],
        email: params[:email]
    }

    if !params[:person_id]
      @person = Person.find_or_create_from_params(person_params)
    else
      @person = Person.find(params[:person_id])
    end

    @person_opportunity = PersonOpportunity.create_with(locked: false)
                              .find_or_initialize_by(person_id: @person.id,
                                                     opportunity_id: params[:opportunity_id])

    @person_opportunity.opportunity_role_id = params[:opportunity_role_id]


    if params[:instances].kind_of?(Array)
      params[:instances].each do |instance|
        if !@person_opportunity.instances.include?(instance)
          @person_opportunity.instances.push(instance)
        end
      end
    elsif params[:instances].kind_of?(String)
      @person_opportunity.instances.push(params[:instances])
    end


    @person_opportunity.save


    # @person_opportunity.opportunity.organizations.each do |o|
      @person.add_to_organization(
          Organization.find(@person_opportunity.opportunity.organization_id), params[:notes]
      )
    # end



    # if !@person_opportunity.person.email.blank? || !@person_opportunity.person.email.nil?
      # OpportunityMailer.opportunity_registration_email(params[:email],@person_opportunity).deliver_now
    # end


    render json: @person
  end




  private

  def person_opportunity_params
    params.require(:person_opportunity).permit(:person_id, :opportunity_id, :schedule,
                                               :opportunity_role_id, :instances)
  end
end



