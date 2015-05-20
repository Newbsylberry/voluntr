class OrganizationsController < ApplicationController
  before_action :authenticate, except: [:log_in, :existence_check, :opportunities]

  # GET /organizations/1
  # GET /organizations/1.json
  def show
    if @current_organization.last_social_update.nil? ||
        @current_organization.last_social_update.strftime("%B %d, %Y") != Time.now.strftime("%B %d, %Y")
      puts @current_organization.id
      Resque.enqueue(OrganizationImporter, @current_organization.id, params[:oauth_key], @current_organization.fb_id)
    end

    render json: @current_organization, serializer: OrganizationSerializer
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
    @current_organization = Organization.find(params[:id])

    if @current_organization.update(params[:organization])
      head :no_content
    else
      render json: @current_organization.errors, status: :unprocessable_entity
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
    @current_organization.destroy

    head :no_content
  end

  # Route to find an organizations people
  def people
    render json: @current_organization.people, each_serializer: PersonSerializer
  end


  def log_in
    @organization = Organization.find(params[:id])
    @user = Koala::Facebook::API.new(params[:oauth].to_s)
    @user.get_connections("me", "accounts").each do |a|
      puts @organization.id
      if a["id"].to_i == @organization.fb_id.to_i && !@organization.nil?
        token = AuthToken.issue_token({ organization_id: @organization.id })
        render json: {organization: @organization,
                      token: token}
        break
      else
        render json: { error: 'Authorization header not valid'}, status: :unauthorized # 401 if no token, or invalid
      end

    end
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
    @current_organization_recorded_hours = Array.new
    @current_organization.opportunities.each do |op|
      op.recorded_hours.each do |oph|
        @current_organization_recorded_hours.push(oph)
      end
    end
    @current_organization.recorded_hours.each do |rh|
      if !@current_organization_recorded_hours.include? rh
        @current_organization_recorded_hours.push(rh)
      end
    end

    render json: @current_organization_recorded_hours,
           each_serializer: RecordedHourSerializer
  end

  def daily_statistics
    if !@current_organization.daily_statistics.nil?
      puts @current_organization.daily_statistics
      render json: @current_organization.daily_statistics, each_serializer: DailyStatisticSerializer
    end

  end


  def contact_volunteers
    @volunteer_contacts = Array.new
    @current_organization.people.each do |o|
      if o.email || o.phone
        if o.created_at > Date.current - 14
          @volunteer_contacts.push(o)
        end
      end
    end
    render json: @volunteer_contacts, each_serializer: PersonSerializer
  end

  def posts
    @current_organization = Organization.find(params[:id])

    render json: @current_organization.posts, each_serializer: PostSerializer
  end


  private

  def organization_params
    params.require(:organization).permit(:fb_id, :name, :description)
  end

end
