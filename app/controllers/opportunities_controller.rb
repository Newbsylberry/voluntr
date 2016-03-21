class OpportunitiesController < ApplicationController
  before_action :authenticate
  skip_before_filter :authenticate, only: [:by_user_location, :opportunity_schedule]
  skip_before_filter :authenticate_user, only: [:by_user_location, :opportunity_schedule]
  include IceCube
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")

  def index
    @opportunities = Opportunity.all

    render json: @opportunities
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @opportunity = Opportunity.find(params[:id])
    @opportunity.instance_hours = @opportunity.instance_recorded_hours(params[:instance_date])
    @opportunity.instance_people_count = @opportunity.instance_people_recording(params[:instance_date])

    render json: @opportunity, instance_date:  params[:instance_date]
  end


  # POST /events
  # POST /events.json
  def create
    @opportunity = Opportunity.new(opportunity_params)
    @opportunity.color = ['#F44336', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#CDDC39'].sample
    if params[:calendar]
      @opportunity.schedule  = SchedulerTool.schedule_from_params(params[:calendar], @opportunity)
    end
    @opportunity.save
    @opportunity.add_organization({id: @current_organization.id, administrator: true})
    if !params[:organizations].nil? && !params[:organizations].empty?
      params[:organizations].each do |o|
        @opportunity.add_organization(o)
      end
    end



    render json: @opportunity
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @opportunity = Opportunity.find(params[:id])

    @opportunity.update(opportunity_params)


    render json: @opportunity
  end

  def update_schedule
    @opportunity = Opportunity.find(params[:id])
    @opportunity.schedule  = SchedulerTool.schedule_from_params(params[:calendar], @opportunity)

    @opportunity.save
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @opportunity = Opportunity.find(params[:id])
    @opportunity.destroy

    head :no_content
  end

  def destroy_instance
    @opportunity = Opportunity.find(params[:id])
    @opportunity.delete_instance(params[:date])

    head :no_content
  end

  def destroy_future_instances
    @opportunity = Opportunity.find(params[:id])
    @opportunity.delete_future_instances(params[:date])

    head :no_content
  end

  def existence_check
    @opportunity = Opportunity.find_by_fb_id(params[:fb_id])

    render json: @opportunity
  end

  def recorded_hours
    @opportunity = Opportunity.find(params[:id])

    render json: @opportunity.recorded_hours, each_serializer: RecordedHourSerializer
  end

  def opportunity_schedule
    @opportunity = Opportunity.find(params[:id])

    render json: @opportunity.instances,
           each_serializer: OpportunityInstanceSerializer
  end

  def by_user_location
    @opportunities = Opportunity.geocoded

    render json: @opportunities.near([params[:lat].to_f,params[:lng].to_f], params[:distance].to_f), each_serializer: OpportunitySerializer
  end

  def instance_statistics
    @opportunity = Opportunity.find(params[:id])

    render json: @opportunity.instances_statistics, each_serializer: OpportunitySerializer
  end

  def instance
    @opportunity = Opportunity.find(params[:id])
    @instance = OpportunityInstance.new
    @instance.opportunity = @opportunity
    @instance.instance_date = Time.parse(params[:instance_date].to_s)


    render json: @instance, serializer: OpportunityInstanceSerializer
  end


  def volunteers
    @opportunity = Opportunity.find_by_id(params[:id]).first

    render json: @opportunity.volunteers, each_serializer: PersonSerializer
  end

  def roles
    @opportunity = Opportunity.find_by_id(params[:id])

    render json: @opportunity.opportunity_roles, each_serializer: OpportunityRoleSerializer
  end

  protected

  def opportunity_params
    params.require(:opportunity).permit(:fb_id, :name, :location, :opportunity_type_id,
                                        :description, :start_time, :end_time, :about,
                                        :city, :state, :zip_code, :timezone, :latitude, :longitude,
                                        :organization_id, :collaborative, :color, :address_1,
                                        :volunteer_goal, :start_schedule,:address_2)
  end

end
