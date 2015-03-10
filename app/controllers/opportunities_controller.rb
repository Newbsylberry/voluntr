class OpportunitiesController < ApplicationController
  respond_to :json


  def index
    @opportunities = Opportunity.all

    render json: @opportunities
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @opportunity = Opportunity.find(params[:id])

    render json: @opportunity
  end

  # POST /events
  # POST /events.json
  def create
    @opportunity = Opportunity.create(opportunity_params)

    respond_with @opportunity
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @opportunity = Opportunity.find(params[:id])

    if @opportunity.update(params[:opportunity])
      head :no_content
    else
      render json: @opportunity.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @opportunity = Opportunity.find(params[:id])
    @opportunity.destroy

    head :no_content
  end

  def existence_check
    @opportunity = Opportunity.find_by_fb_id(params[:fb_id])

    render json: @opportunity
  end

  protected

  def opportunity_params
    params.require(:opportunity).permit(:fb_id, :name, :location, :opportunity_type_id,
                                  :description, :start_time, :end_time, :about,
                                  :timezone, :latitude, :longitude, :organization_id )
  end

end
