class UsersController < ApplicationController
  before_action :authenticate_user, only: [:current_user_organizations, :update_password]

  def index

  end

  def show
    @user = User.find(params[:id])

    render json: @user
  end

  def facebook_login
    @graph = Koala::Facebook::OAuth.new(ENV['FB_APP_ID'], ENV['FB_SECRET_KEY'], ENV['FB_CALLBACK_URL'])
    @user = User.create_with(locked: false).find_or_initialize_by(uid: params[:fb_id])
    if !@user.persisted? && !User.exists?(email: params[:email])
      @user.email = params[:email]
      @user.provider = 'facebook'
      @user.profile = Profile.new
      @user.profile.first_name = params[:first_name]
      @user.profile.last_name = params[:last_name]
      @user.profile.save
    elsif params[:email] && User.exists?(email: params[:email])
      @user = User.find_by_email(params[:email])
      @user.provider = 'facebook'
      @user.uid = params[:fb_id]
    end
    token = @graph.exchange_access_token_info(params[:token].to_s)
    @user.oauth_token = token["access_token"];
    @user.save

    user_token = AuthToken.issue_token({ user_id: @user.id})
    render json: {user: @user, token: user_token}
  end


  def update_password
    @user = User.find(@current_user.id)

    if @user.update(user_params)
      token = AuthToken.issue_token({ user_id: @user.id })
      render json: { token: token }
    end
  end

  def create_profile
    @current_user.profile = Profile.new(first_name: params[:first_name], last_name: params[:last_name])
    @current_user.save

    render json: @current_user
  end

  def user_params
    # NOTE: Using `strong_parameters` gem
    params.require(:user).permit(:password, :password_confirmation)
  end

  def current_user_organizations
    if @current_user && !@current_user.organizations.empty?
      ap @current_user.organizations
      render json: @current_user.organizations, each_serializer: OrganizationSerializer
    end
  end
end
