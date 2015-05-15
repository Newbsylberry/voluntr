class OrganizationsController < ApplicationController
  respond_to :json
  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Organization.all

    render json: @organizations
  end

  # GET /organizations/1
  # GET /organizations/1.json
  def show
    @organization = Organization.find(params[:id])
    if @organization.last_social_update.nil? ||
        @organization.last_social_update.strftime("%B %d, %Y") != Time.now.strftime("%B %d, %Y")
      puts @organization.id
      Resque.enqueue(OrganizationImporter, @organization.id, params[:oauth_key], @organization.fb_id)
    end

    render json: @organization, serializer: OrganizationSerializer
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @organization = Organization.create(organization_params)

    if @organization.save
      Resque.enqueue(OrganizationImporter, @organization.id, params[:oauth_key], @organization.fb_id)
    end

    respond_with @organization
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    @organization = Organization.find(params[:id])

    if @organization.update(params[:organization])
      head :no_content
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def existence_check
    @organization = Organization.find_by_fb_id(params[:fb_id])

    puts @organization if @organization
    render json: @organization
  end

  # DELETE /organizations/1
  # DELETE /organizations/1.json
  def destroy
    @organization = Organization.find(params[:id])
    @organization.destroy

    head :no_content
  end

  # Route to find an organizations people
  def people
    @organization = Organization.find(params[:id])
    render json: @organization.people, each_serializer: PersonSerializer
  end




  def opportunities
    @organization = Organization.find(params[:id])
    @organization_calendar = Array.new
    @organization.opportunities.each do |o|
      if !o.start_schedule.nil?
        @event_duration = ((o.end_time.to_i - o.start_time.to_i) / 3600000).round
        start_time = IceCube::Schedule.from_yaml(o.start_schedule)
        if params[:start] and start_time.occurs_between?(Time.at(params[:start].to_i), Time.at(params[:end].to_i))
          start_time.occurrences_between(Time.at(params[:start].to_i), Time.at(params[:end].to_i)).each do |occ|
            @schedule_instance = Opportunity.new
            @schedule_instance.name = o.name
            @schedule_instance.id = o.id
            @schedule_instance.color  = o.color
            @schedule_instance.start_time = occ
            @schedule_instance.end_time = occ + @event_duration.hours
            @organization_calendar.push(@schedule_instance)
          end
        else
          @organization_calendar.push(o)
        end
      elsif o.start_schedule.nil? || o.start_schedule.nil?
        o.start_time = Time.at(o.start_time.to_i / 1000)
        o.end_time = Time.at(o.end_time.to_i / 1000)
        @organization_calendar.push(o)
        # else

      end

    end
    render json: @organization_calendar, each_serializer: OpportunitySerializer
  end

  def recorded_hours
    @organization = Organization.find(params[:id])
    @organization_recorded_hours = Array.new
    @organization.opportunities.each do |op|
      op.recorded_hours.each do |oph|
        @organization_recorded_hours.push(oph)
      end
    end
    @organization.recorded_hours.each do |rh|
      if !@organization_recorded_hours.include? rh
        @organization_recorded_hours.push(rh)
      end
    end

    render json: @organization_recorded_hours,
           each_serializer: RecordedHourSerializer
  end

  def daily_statistics
    @organization = Organization.find(params[:id])
    if !@organization.daily_statistics.nil?
      puts @organization.daily_statistics
      render json: @organization.daily_statistics, each_serializer: DailyStatisticSerializer
    end

  end


  def contact_volunteers
    @organization = Organization.find(params[:id])
    @volunteer_contacts = Array.new
    @organization.people.each do |o|
      if o.email || o.phone
        if o.created_at > Date.current - 14
          @volunteer_contacts.push(o)
        end
      end
    end
    render json: @volunteer_contacts, each_serializer: PersonSerializer
  end

  private

  def organization_params
    params.require(:organization).permit(:fb_id, :name, :description)
  end

end
