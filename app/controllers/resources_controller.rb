class ResourcesController < ApplicationController
  before_action :authenticate

  def create
    @resource = Resource.create(resource_params)
    @resource.resource_type = ResourceType.find_by_name(params[:resource_type])
    @resource.save
  end

  def destroy
      @resource = Resource.find(params[:id])
      @resource.destroy

      head :no_content
  end

  def update
    @resource = Resource.find(params[:id])

    @resource.update(resource_params)
    @resource.resource_type = ResourceType.find_by_name(params[:type_name])
    @resource.save

    render json: @resource, serializer: ResourceSerializer
  end


  protected

  def resource_params
    params.require(:resource).permit(:id, :name, :description, :resourceable_id,
                                        :resourceable_type, :resource)
  end
end
