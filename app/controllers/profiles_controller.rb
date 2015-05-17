class ProfilesController < ApplicationController


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
