class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::ImplicitRender
  include ActionController::ParamsWrapper
  wrap_parameters format: :json

  def default_serializer_options
    {root: false}
  end

end
