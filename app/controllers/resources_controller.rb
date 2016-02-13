class ResourcesController < ApplicationController
  def create
    @resource = Resource.create(resource_params)
  end


  protected

  def resource_params
    params.require(:resource).permit(:id, :name, :description, :resourceable_id,
                                        :resourceable_type, :resource)
  end
end
