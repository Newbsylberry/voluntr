class OrganizationsController < ApplicationController
  include HTTParty
  before_action :authenticate, except: [:log_in, :existence_check, :opportunities, :create,
                                        :mailchimp_integration, :mailchimp_callback, :show_by_url]
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")
  # GET /organizations/1
  # GET /organizations/1.json
  def show
    if @current_organization.last_social_update.nil? ||
        @current_organization.last_social_update.strftime("%B %d, %Y") != Time.now.strftime("%B %d, %Y")
      OrganizationImporter.new(@current_organization.id, params[:oauth_key], @current_organization.fb_id).enqueue
    end

    render json: @current_organization, serializer: OrganizationSerializer
  end

  def show_by_url
    @organization = Organization.find_by_custom_url(params[:custom_url])

    render json: @organization, serializer: OrganizationSerializer
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @organization = Organization.create(organization_params)

    if @organization.save
      OrganizationImporter.new(@organization.id, params[:oauth_key], @organization.fb_id).enqueue
      token = AuthToken.issue_token({ organization_id: @organization.id })
    end


    token = AuthToken.issue_token({ organization_id: @organization.id })

    render json: {organization: @organization, token: token}
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    @current_organization = Organization.find(params[:id])

    if @current_organization.update(organization_params)
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
    @query = JSON(params[:query])
    @order = @query["order"]
    if @query["order"].include?('-')
      puts true
      @order = "#{@query["order"].tr('-', '')} DESC"
      puts @order
    else
      puts false
      @order = @query["order"]
    end
    people = @current_organization.people.order(@order).page(@query["page"]).per(@query["limit"].to_i)

    render json: people, each_serializer: PersonSerializer
  end


  def log_in
    @organization = Organization.find(params[:id])
    @user = Koala::Facebook::API.new(params[:oauth].to_s)
    @user_accounts = @user.get_connections("me", "accounts").count
    @user.get_connections("me", "accounts").each do |a|
      if a["id"].to_i == @organization.fb_id.to_i
        token = AuthToken.issue_token({ organization_id: @organization.id })
        render json: {organization: @organization,
                      token: token}
        break
      elsif @user_accounts == 0 && a["id"].to_i != @organization.fb_id.to_i
        render json: { error: 'Authorization header not valid'}, status: :unauthorized # 401 if no token, or invalid
      end

    end
  end

  def opportunities
    @organization = Organization.find(params[:id])


    render json: SchedulerTool.list_of_instances(@organization, params[:start], params[:end]),
           each_serializer: OpportunityInstanceSerializer
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

  def search_organization
    @current_organization = Organization.find(params[:id])

    results = Elasticsearch::Model.search(
        "*#{params[:query]}* AND organization_id:#{@current_organization.id}", [Opportunity, OrganizationPerson])
    render json: results
  end

  def search_people
    @current_organization = Organization.find(params[:id])

    results = Elasticsearch::Model.search(
        "*#{params[:query]}* AND organization_id:#{@current_organization.id}", [OrganizationPerson])
    render json: results
  end


  private

  def organization_params
    params.require(:organization).permit(:id, :fb_id, :name, :description, :address, :state, :city, :zip_code,
                                         :custom_url, :website_url, :facebook_url, :twitter_url, :instagram_url,
                                         :terms_of_service_file)
  end

end
