class UsersController < ApplicationController
  before_action :authenticate
  def index

  end



  def show
    @user = User.find(params[:id])

    render json: @user
  end

  def update_password
    @user = User.find(@current_user.id)

    if @user.update(user_params)
      token = AuthToken.issue_token({ user_id: @user.id, organization_id: @current_organization.id })
      render json: { token: token, organization_id: @current_organization.id }
    end
  end

  def user_params
    # NOTE: Using `strong_parameters` gem
    params.require(:user).permit(:password, :password_confirmation)
  end

end
