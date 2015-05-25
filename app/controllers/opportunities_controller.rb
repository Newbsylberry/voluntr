class OpportunitiesController < ApplicationController
  include IceCube
  require_dependency ("#{Rails.root}/lib/schedule_params.rb")




  def index
    @opportunities = Opportunity.all

    render json: @opportunities
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @opportunity = Opportunity.find(params[:id])


    render json: @opportunity, instance_date:  params[:instance_date]
  end


  # POST /events
  # POST /events.json
  def create
    @opportunity = Opportunity.new(opportunity_params)
    @opportunity.color = ['#F44336', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#CDDC39'].sample

    ScheduleFromParams.schedule_from_params(params)

    @opportunity.save

    respond_with @opportunity
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @opportunity = Opportunity.find(params[:id])

    if params[:schedule] == true
      params[:opportunity][:start_schedule] = ScheduleFromParams.schedule_from_params(params)
    end

    puts params[:start_schedule]
    puts params
    render json: @opportunity.update(opportunity_params)
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

  def opportunity_schedule
    @opportunity = Opportunity.find(params[:id])
    @opportunity_calendar = Array.new
    if !@opportunity.start_schedule.nil?
      @event_duration = ((@opportunity.end_time.to_i - @opportunity.start_time.to_i) / 3600000).round
      start_time = IceCube::Schedule.from_yaml(@opportunity.start_schedule)
      if params[:start] and start_time.occurs_between?(Time.at(params[:start].to_i), Time.at(params[:end].to_i))
        start_time.occurrences_between(Time.at(params[:start].to_i), Time.at(params[:end].to_i)).each do |occ|
          @schedule_instance = Opportunity.new
          @schedule_instance.name = @opportunity.name
          @schedule_instance.id = @opportunity.id
          @schedule_instance.color  = @opportunity.color
          puts occ
          @schedule_instance.start_time = occ
          @schedule_instance.end_time = occ + @event_duration.hours
          @opportunity_calendar.push(@schedule_instance)
        end
      else
        @opportunity_calendar.push(o)
      end
    elsif @opportunity.start_schedule.nil? || @opportunity.start_schedule.nil?
      @opportunity.start_time = Time.at(@opportunity.start_time.to_i / 1000)
      @opportunity.end_time = Time.at(@opportunity.end_time.to_i / 1000)
      @opportunity_calendar.push(@opportunity)
    end
    render json: @opportunity_calendar, each_serializer: OpportunitySerializer
  end



  def people
    @opportunity = Opportunity.find_by_id(params[:id])

    render json: @opportunity.people, each_serializer: PersonSerializer
  end


  protected

  def opportunity_params
    params.require(:opportunity).permit(:fb_id, :name, :location, :opportunity_type_id,
                                        :description, :start_time, :end_time, :about,
                                        :city, :state, :zip_code, :timezone, :latitude, :longitude,
                                        :organization_id, :color, :address, :volunteer_goal, :start_schedule)
  end

end
