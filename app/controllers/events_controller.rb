class EventsController < ApplicationController
  respond_to :json

  # GET /events
  # GET /events.json
  def index
    @events = Event.all

    render json: @events
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])

    render json: @event
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.create(event_params)

    respond_with @event
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event = Event.find(params[:id])

    if @event.update(params[:event])
      head :no_content
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    head :no_content
  end

  def existence_check
    @event = Event.find_by_fb_id(params[:fb_id])

    render json: @event
  end

  def event_params
    params.require(:event).permit(:fb_id, :name, :location,
                                  :description, :start_time, :end_time, :about,
                                  :timezone, :latitude, :longitude )
  end

end
