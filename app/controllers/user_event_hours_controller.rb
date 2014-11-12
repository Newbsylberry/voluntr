class UserEventHoursController < ApplicationController
  respond_to :json
  # GET /user_event_hours
  # GET /user_event_hours.json
  def index
    @user_event_hours = UserEventHour.all

    render json: @user_event_hours
  end

  # GET /user_event_hours/1
  # GET /user_event_hours/1.json
  def show
    @user_event_hour = UserEventHour.find(params[:id])

    render json: @user_event_hour
  end

  # POST /user_event_hours
  # POST /user_event_hours.json
  def create
    @user_event_hour = UserEventHour.create(user_event_hours_params)

    respond_with @user_event_hour
  end

  # PATCH/PUT /user_event_hours/1
  # PATCH/PUT /user_event_hours/1.json
  def update
    @user_event_hour = UserEventHour.find(params[:id])

    if @user_event_hour.update(params[:user_event_hour])
      head :no_content
    else
      render json: @user_event_hour.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_event_hours/1
  # DELETE /user_event_hours/1.json
  def destroy
    @user_event_hour = UserEventHour.find(params[:id])
    @user_event_hour.destroy

    head :no_content
  end

  protected

  def user_event_hours_params
    params.require(:user_event_hour).permit(:event_id, :description, :hours)
    end

end
