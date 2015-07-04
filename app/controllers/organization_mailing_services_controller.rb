class OrganizationMailingServicesController < ApplicationController

  def mailchimp_callback

    @organization = Organization.find(Base64.decode64(params[:state]))


    client = OAuth2::Client.new('491000452870',
                                'f42b8b94d89b7cf50a81feaad3530c7d',
                                :site => 'https://login.mailchimp.com')
    client.options[:token_url] = "/oauth2/token"
    token = client.auth_code.get_token(params["code"],
                                       :redirect_uri => 'http://127.0.0.1:3000/api/v1/mailchimp_oauth_response',
                                       :headers => {'grant_type' => 'authorization_code'})

    metadata = token.get('/oauth2/metadata')

    token.client.site = JSON.parse(metadata.body)["api_endpoint"]



    @service = OrganizationMailingService.create_with(locked: false).
        find_or_initialize_by(organization_id: @organization.id, token: token.token, service_type: 'mail_chimp')
    @service.save
  end

end
