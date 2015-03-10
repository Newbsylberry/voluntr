class OpportunityTypesController < ApplicationController

  def index
    @opportunity_types = OpportunityType.all

    render json: @opportunity_types
  end


end
