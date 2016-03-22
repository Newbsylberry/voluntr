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

  def recorded_hours
    render json: OpportunityInstance.get_by_opportunity_and_instance_date(params[:id], params[:date]).instance_recorded_hours
  end

  def volunteers
    render json: OpportunityInstance.get_by_opportunity_and_instance_date(params[:id], params[:date]).instance_volunteers
  end
end
