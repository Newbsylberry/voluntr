class ApplicationController < ActionController::API
  include ActionController::RespondWith
  include ActionController::ParamsWrapper
  wrap_parameters format: :json
  before_filter :cors_preflight_check
  after_filter :cors_set_access_control_headers


  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Max-Age'] = "1728000"
  end

# If this is a preflight OPTIONS request, then short-circuit the
# request, return only the necessary headers and return an empty
# text/plain.

  def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version'
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end
  

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
