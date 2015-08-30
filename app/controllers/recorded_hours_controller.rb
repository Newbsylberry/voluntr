class RecordedHoursController < ApplicationController



  def index
    @recorded_hours = DailyStatistic.all

    render json: @recorded_hours
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @recorded_hour = RecordedHour.find(params[:id])

    render json: @recorded_hour
  end


  # POST /events
  # POST /events.json
  def create
    @recorded_hours = RecordedHour.create(recorded_hours_params)



    @recorded_hours.send_sign_in_email

    render @recorded_hours, serializer: RecordedHourSerializer
  end



  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @recorded_hour = RecordedHour.find(params[:id])

    @recorded_hour.update(recorded_hours_params)
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @recorded_hours = RecordedHour.find(params[:id])
    @recorded_hours.destroy

    head :no_content
  end



  protected

  def recorded_hours_params
    params.require(:recorded_hour).permit(:id, :opportunity_id,
                                            :organization_id, :person_id, :hours, :description,
                                            :opportunity_role_id, :photo_consent, :group_id, :date_recorded)
  end



end
