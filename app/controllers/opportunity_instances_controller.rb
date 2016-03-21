class OpportunityInstancesController < ApplicationController

  def show
    render json: OpportunityInstance.get_by_opportunity_and_instance_date(params[:id], params[:date]), serializer: OpportunityInstanceSerializer
  end

  def instance_roles
    render json: OpportunityInstance.get_by_opportunity_and_instance_date(params[:id], params[:date]).instance_roles
  end

  def people
    render json: OpportunityInstance.get_by_opportunity_and_instance_date(params[:id], params[:date]).instance_people
  end
end
