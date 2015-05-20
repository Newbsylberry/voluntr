class UsersController < ApplicationController

  def index
  end

  def show
    @user = User.find(params[:id])

    render json: @user
  end

  def contact
    @email = params[:email]
    @content = params[:content]

    UserMailer.contact_email(@email, @content).deliver
  end

end
