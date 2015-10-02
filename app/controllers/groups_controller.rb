class GroupsController < ApplicationController

  def index
    @groups = Group.all

    render json: @groups
  end

  def show
    @group = Group.find(params[:id])

    render json: @group
  end


  def create
    @group = Group.create(group_params)


    render json: @group
  end

  def people
    @group = Group.find(params[:id])

    render json: @group.people, each_serializer: PeopleController
  end

  def recorded_hours
    @group = Group.find(params[:id])

    render json: @group.recorded_hours, each_serializer: RecordedHourSerializer
  end

  def opportunities
    @group = Group.find(params[:id])

    render json: @group.opportunities, each_serializer: OpportunitySerializer
  end

  protected

  def group_params
    params.require(:group).permit(:id, :name, :description, :city, :state, :latitude, :longitude)
  end

end
