class UsersController < ApplicationController
  respond_to :json

  def index
  end

  def show
    @user = User.find(params[:id])

    render json: @user
  end

end
