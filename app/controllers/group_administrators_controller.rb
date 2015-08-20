class GroupAdministratorsController < ApplicationController
  def index
    @group_administrators = GroupAdministrator.all

    render json: @group_administrators
  end

  def show
    @group_administrator = GroupAdministrator.find(params[:id])

    render json: @group_administrator
  end


  def create
    @group_administrator = GroupAdministrator.create(group_administrator_params)


    render json: @group_administrator
  end

  protected

  def group_administrator_params
    params.require(:group_administrator).permit(:id, :group_id, :person_id)
  end
end
