class PersonOpportunitiesController < ApplicationController
  include IceCube



  def create
    @person = Person.find_or_create_from_params(params)

    @person_opportunity = PersonOpportunity.create_with(locked: false)
                              .find_or_initialize_by(person_id: @person.id,
                                                     opportunity_id: params[:opportunity_id])

    @person_opportunity.opportunity_role_id = params[:opportunity_role_id]

    params[:instances].each do |instance|
      @person_opportunity.instances.push(instance)
      @person_opportunity.save
    end

    if params[:organization_id]
      @person.add_to_organization(Organization.find(params[:organization_id]), params[:notes])
    end

    render json: @person
  end




  private

  def person_opportunity_params
    params.require(:person_opportunity).permit(:person_id, :opportunity_id, :schedule,
                                               :opportunity_role_id, :instances)
  end
end



