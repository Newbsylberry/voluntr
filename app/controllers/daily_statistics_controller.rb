class DailyStatisticsController < ApplicationController



  def index
    @opportunities = DailyStatistic.all

    render json: @opportunities
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @daily_statistic = DailyStatistic.find(params[:id])

    render json: @daily_statistic
  end


  # POST /events
  # POST /events.json
  def create
    @daily_statistic = DailyStatistic.new(daily_statistic_params)

    @daily_statistic.save

    respond_with @daily_statistic
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @daily_statistic = DailyStatistic.find(params[:id])

    if @daily_statistic.update(params[:daily_statistic])
      head :no_content
    else
      render json: @daily_statistic.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @daily_statistic = DailyStatistic.find(params[:id])
    @daily_statistic.destroy

    head :no_content
  end



  protected

  def daily_statistic_params
    params.require(:daily_statistic).permit(:total_recorded_hours, :total_added_volunteers,
                                            :organization_id, :description, :total_possible_hours)
  end
end
