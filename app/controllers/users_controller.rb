class UsersController < ApplicationController
  before_action :authenticate_user, only: [:current_user_organizations, :update_password]

  def index

  end

  def show
    @user = User.find(params[:id])

    render json: @user
  end

  def update_password
    @user = User.find(@current_user.id)

    if @user.update(user_params)
      token = AuthToken.issue_token({ user_id: @user.id })
      render json: { token: token }
    end
  end

  def user_params
    # NOTE: Using `strong_parameters` gem
    params.require(:user).permit(:password, :password_confirmation)
  end

  def current_user_organizations
    ap @current_user.organizations
    render json: @current_user.organizations, each_serializer: OrganizationSerializer
  end
end
