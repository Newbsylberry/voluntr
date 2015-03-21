class PersonOpportunitiesController < ApplicationController
  respond_to :json


  def create
    @person_opportunity = PersonOpportunity.create(person_opportunity_params)


    respond_with @person_opportunity
  end


  private

  def person_opportunity_params
    params.require(:person_opportunity).permit(:person_id, :opportunity_id)
  end

end
