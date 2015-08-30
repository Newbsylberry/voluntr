class PersonOpportunitiesController < ApplicationController
  include IceCube



  def create
    @person_opportunity = PersonOpportunity.create_with(locked: false)
                              .find_or_initialize_by(person_id: params[:person_id],
                                                     opportunity_id: params[:opportunity_id],
                                                     opportunity_role_id: params[:opportunity_role_id])
    @person_opportunity.save
    end




    private

    def person_opportunity_params
      params.require(:person_opportunity).permit(:person_id, :opportunity_id, :schedule, :opportunity_role_id)
    end

    end


