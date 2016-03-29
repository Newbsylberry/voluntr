class ResourcesController < ApplicationController
  def create
    @resource = Resource.create(resource_params)
    @resource.resource_type = ResourceType.find_by_name(params[:resource_type])
    @resource.save
  end


  protected

  def resource_params
    params.require(:resource).permit(:id, :name, :description, :resourceable_id,
                                        :resourceable_type, :resource)
  end
end
