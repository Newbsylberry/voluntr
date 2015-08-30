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

  protected

  def group_params
    params.require(:group).permit(:id, :name, :description, :city, :state, :latitude, :longitude)
  end

end
