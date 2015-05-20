class ApplicationController < ActionController::API
  include ActionController::RespondWith
  include ActionController::ParamsWrapper
  wrap_parameters format: :json

  def default_serializer_options
    {root: false}
  end

  protected

  # This method requests an authorization token from the client framework.
  def authenticate
    begin
      token = request.headers['Authorization'].split(' ').last # token is taken from request headers
      payload, header = AuthToken.valid?(token) #checks to see if token is valid
      @current_organization = Organization.find_by(id: payload['organization_id']) # takes the user id from the payload in order to make current user
    rescue
      render json: { error: 'Authorization header not valid'}, status: :unauthorized # 401 if no token, or invalid
    end
  end

end
