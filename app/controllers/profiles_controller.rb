class ProfilesController < ApplicationController
  before_action :authenticate_user

  # GET /profiles
  # GET /profiles.json
  def index
    @profiles = Profile.all

    render json: @profiles
  end

  # GET /profiles/1
  # GET /profiles/1.json
  def show
    @profile = Profile.find(params[:id])

    render json: @profile
  end

  # POST /profiles
  # POST /profiles.json
  def create
        @profile = Profile.create(profile_params)
        if @current_user
          @profile.user = @current_user
          @profile.save
        elsif !@current_user && params[:user_id]
          @profile.user = User.find(params[:user_id])
        end

        respond_with @profile
  end

  # PATCH/PUT /profiles/1
  # PATCH/PUT /profiles/1.json
  def update
    @profile = Profile.find(params[:id])

    if @profile.update(params[:profile])
      head :no_content
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /profiles/1
  # DELETE /profiles/1.json
  def destroy
    @profile = Profile.find(params[:id])
    @profile.destroy

    head :no_content
  end

  private

  def profile_params
    params.require(:profile).permit(:user_id, :first_name, :last_name)
  end

end
