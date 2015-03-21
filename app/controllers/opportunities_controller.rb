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

    if @opportunity.start_schedule
      schedule = IceCube::Schedule.from_yaml(@opportunity.start_schedule)

      puts schedule.occurs_on?(Time.at(params[:instance_date].to_i / 1000))
    end

    render json: @opportunity
  end

  # POST /events
  # POST /events.json
  def create
    @opportunity = Opportunity.new(opportunity_params)
    @opportunity.color = ['#F44336', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#CDDC39'].sample

    if params[:repeating_event] === true
      @opportunity.opportunity_type_id = 1
      @start_schedule = Schedule.new(Time.at(@opportunity.start_time.to_i / 1000 ))
      if params[:daily] == true && params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.daily
      elsif params[:daily] == true && !params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.daily(params[:repeat_count])
      end
      if params[:weekly] == true && params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.weekly.day(params[:repeat_days])
      elsif params[:weekly] == true && !params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.weekly(params[:repeat_count]).day(params[:repeat_days])
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



  def people
    @opportunity = Opportunity.find_by_id(params[:id])

    render json: @opportunity.people, each_serializer: PersonSerializer
  end


  protected

  def opportunity_params
    params.require(:opportunity).permit(:fb_id, :name, :location, :opportunity_type_id,
                                        :description, :start_time, :end_time, :about,
                                        :city, :state, :zip_code,
                                        :timezone, :latitude, :longitude, :organization_id, :color )
  end

end
