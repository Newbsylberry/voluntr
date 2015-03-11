class OpportunitiesController < ApplicationController
  include IceCube

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
    @opportunity = Opportunity.new(opportunity_params)
    if @opportunity.opportunity_type_id = 2
      @start_schedule = Schedule.new(Time.at(@opportunity.start_time.to_i / 1000 ))
      @end_schedule = Schedule.new(Time.at(@opportunity.end_time.to_i / 1000 ))
      if params[:daily] == true
        @start_schedule.add_recurrence_rule Rule.daily
        @end_schedule.add_recurrence_rule Rule.daily
      end
      if params[:weekly] == true
        @start_schedule.add_recurrence_rule Rule.weekly
        @end_schedule.add_recurrence_rule Rule.weekly
      end
      if params[:monthly] == true
        @start_schedule.add_recurrence_rule Rule.monthly
        @end_schedule.add_recurrence_rule Rule.monthly
      end
      if params[:yearly] == true
        @start_schedule.add_recurrence_rule Rule.yearly
        @end_schedule.add_recurrence_rule Rule.yearly
      end
      @opportunity.start_schedule = @start_schedule.to_yaml
      @opportunity.end_schedule = @end_schedule.to_yaml
    end
    @opportunity.save

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
