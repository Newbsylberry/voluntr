class RecordedHoursController < ApplicationController
  respond_to :json


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



    @daily_statistic =
        DailyStatistic.create_with(locked: false)
            .find_or_initialize_by(date: @recorded_hours.created_at.beginning_of_day)
    if !@daily_statistic.persisted?
      @daily_statistic.organization_id = params[:organization_id]
    @daily_statistic.total_recorded_hours = 0
    @daily_statistic.total_recorded_hours += @recorded_hours.hours
    @daily_statistic.save
    else
      @daily_statistic.organization_id = params[:organization_id]
      @daily_statistic.total_recorded_hours += @recorded_hours.hours
      @daily_statistic.save
    end


    respond_with @recorded_hours
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @recorded_hour = RecordedHour.find(params[:id])

    if @recorded_hours.update(params[:recorded_hours])
      head :no_content
    else
      render json: @recorded_hours.errors, status: :unprocessable_entity
    end
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
    params.require(:recorded_hour).permit(:opportunity_id,
                                            :organization_id, :person_id, :hours)
  end



end
