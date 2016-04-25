class OrganizationsController < ApplicationController
  include HTTParty
  before_action :authenticate, except: [:log_in, :existence_check, :opportunities, :create,
                                        :mailchimp_integration, :mailchimp_callback, :show_by_url,
                                        :provide_token, :sign_in_create]
  before_action :authenticate_user, only: :provide_token
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")
  # GET /organizations/1
  # GET /organizations/1.json
  def show

    render json: @current_organization, serializer: OrganizationSerializer
  end


  def show_by_url
    @organization = Organization.find_by_custom_url(params[:custom_url])

    render json: @organization, serializer: OrganizationSerializer
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @graph = Koala::Facebook::OAuth.new(ENV['FB_APP_ID'], ENV['FB_SECRET_KEY'], ENV['FB_CALLBACK_URL'])
    token = @graph.exchange_access_token_info(params[:oauth_key].to_s)

    @user = User.find_by_email(params[:email].to_s)

    @organization = Organization.create(organization_params)
    UserOrganization.create(user_id: @user.id, organization_id: @organization.id)
    @organization.organization_type = OrganizationType.find_by_name(params[:organization_type_name])
    @organization.save
    if @organization.save
      OrganizationWorker.perform_later(@organization.id, params[:oauth_key], @organization.fb_id)
      token = AuthToken.issue_token({ organization_id: @organization.id })
    end


    token = AuthToken.issue_token({ organization_id: @organization.id })

    render json: {organization: @organization, token: token}
  end

  def nearby_organizations
    if @current_organization.latitude and @current_organization.longitude
      render json: @current_organization.nearbys(params[:distance]), each_serializer: OrganizationSerializer
    else
      render json: @current_organization.nearbys(params[:distance]), each_serializer: OrganizationSerializer
    end
  end

  def create_with_email
    @organization = Organization.create(organization_params)

    token = AuthToken.issue_token({ organization_id: @organization.id })
    UserOrganization.create(organization_id: @organization.id, user_id: @current_user.id)
    @organization.organization_type = OrganizationType.find_by_name(params[:organization_type_name])
    @organization.save



    render json: {organization: @organization, token: token}
  end

  def sign_in_create
    person = Person.find(params[:person_id])
    @organization = Organization.new(name: params[:name])
    @organization.organization_type = OrganizationType.find_by_name('Volunteer Group')
    @organization.save

    if params[:administrator] === true && person.email
      User.create!({:email => person.email})
    end

    render json: {organization: @organization}
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    if @current_organization.update(organization_params)
      render json: @current_organization, serializer: OrganizationSerializer
    else
      render json: @current_organization.errors, status: :unprocessable_entity
    end
  end

  def existence_check
    @organization = Organization.find_by_fb_id(params[:fb_id])

    ap @organization if @organization
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
    if params[:query]
      @query = JSON(params[:query])
      @order = @query["order"]
      if @query["order"].include?('-')
        @order = "#{@query["order"].tr('-', '')} DESC"
      else
        @order = @query["order"]
      end
      if @query["contact_only"] == true
        people = @current_organization.people.contact_information_completed.order(@order).page(@query["page"]).per(@query["limit"].to_i)
        count = @current_organization.people.contact_information_completed.count
      else
        people = @current_organization.people.order(@order).page(@query["page"]).per(@query["limit"].to_i)
        count = @current_organization.people.count
      end
    else
      people = @current_organization.people
    end



    render json: people, each_serializer: PersonSerializer, count: count
  end


  def log_in
    @organization = Organization.find(params[:id])
    @user = User.find_by_uid(params[:fb_id])
    @api = Koala::Facebook::API.new(@user.oauth_token)
    if @organization.last_social_update.nil? ||
        @organization.last_social_update.strftime("%B %d, %Y") != Time.now.strftime("%B %d, %Y") &&
            @organization.fb_id
      OrganizationWorker.perform_later(@organization.id, @user.oauth_token, @organization.fb_id)
    end
    @user_accounts = @api.get_connections("me", "accounts").count
    @api.get_connections("me", "accounts").each do |a|
      if a["id"].to_i == @organization.fb_id.to_i
        if !@organization.users.include?(@user)
          UserOrganization.create!(user_id: @user.id, organization_id: @organization.id)
        end
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

  def public_opportunities
    @organization = Organization.find(params[:id])

    ap @organization.public_opportunities
    render json: @organization.public_opportunities, each_serializer: OpportunitySerializer
  end

  def associated_organizations
    ap @current_organization.associated_organizations
    render json: @current_organization.associated_organizations, each_serializer: OrganizationSerializer
  end

  def recently_recorded_hours
    @current_organization_recorded_hours = Array.new
    if @current_organization.organization_type.name === 'Nonprofit'
      @current_organization.opportunities.each do |o|
        o.recorded_hours.each do |rh|
          if !rh.date_recorded.nil? && rh.date_recorded > Time.now - 14.days && @current_organization_recorded_hours.count < 14
            @current_organization_recorded_hours.push(rh)
          end
        end
      end
    elsif @current_organization.organization_type.name === 'Volunteer Group'
      @current_organization.recorded_hours.each do |rh|
        if !rh.date_recorded.nil? && rh.date_recorded > Time.now - 3.days
          @current_organization_recorded_hours.push(rh)
        end
      end
    end
    render json: @current_organization_recorded_hours,
           each_serializer: RecordedHourSerializer
  end


  def daily_statistics
    @organization = Organization.find(params[:id])

    if !@organization.daily_statistics.nil?

      render json: @organization.daily_statistics, each_serializer: DailyStatisticSerializer
    end
  end

  def summary_statistics
    @organization = Organization.find(params[:id])

    render json: {
               volunteers: @organization.total_people,
               total_hours: @organization.total_recorded_hours,
               total_opportunities: @organization.total_opportunities,
               average_hours_recorded: @organization.average_hours_recorded.round(2)
           }
  end

  def contact_volunteers
    @volunteer_contacts = Array.new
    @current_organization.people.each do |o|
      if @volunteer_contacts.count < 20
        if o.email || o.phone
          if o.created_at > Date.current - 14
            @volunteer_contacts.push(o)
          end
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

  def contact_organization
    OrganizationMailer.contact_organization_email(
        Organization.find(params[:contacting_organization_id]),
        @current_organization,
        params[:message]).deliver
  end

  def search_people
    @current_organization = Organization.find(params[:id])

    results = Elasticsearch::Model.search(
        "*#{params[:query]}* AND organization_id:#{@current_organization.id}", [OrganizationPerson])
    render json: results
  end

  def provide_token
    @current_organization = Organization.find(params[:id])

    if @current_organization.users.include? @current_user
      token = AuthToken.issue_token({ user_id: @current_user.id, organization_id: @current_organization.id })
      render json: { token: token }
    else
      render json: { error: 'Authorization header not valid'}, status: :unauthorized # 401 if no token, or invalid
    end
  end

  def destroy
    @current_organization.destroy!
  end

  private

  def organization_params
    params.require(:organization).permit(:id, :fb_id, :name, :description, :address_1, :address_2, :state, :city, :zip_code,
                                         :custom_url, :website_url, :facebook_url, :twitter_url, :instagram_url,
                                         :terms_of_service_file, :picture)
  end

end
