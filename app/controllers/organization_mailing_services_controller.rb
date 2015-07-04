class OrganizationMailingServicesController < ApplicationController
  include Mailchimp

  def mailchimp_callback
    @organization = Organization.find(Base64.decode64(params[:state]))


    client = Mailchimp.client('https://login.mailchimp.com')
    token = client.auth_code.get_token(params["code"],
                                       :redirect_uri => 'http://127.0.0.1:3000/api/v1/auth/mailchimp_callback',
                                       :headers => {'grant_type' => 'authorization_code'})

    metadata = token.get('/oauth2/metadata')
    json = JSON.parse(metadata.body)


    @service = OrganizationMailingService.create_with(locked: false).
        find_or_initialize_by(organization_id: @organization.id, token: token.token + "-" + json["dc"], service_type: 'mail_chimp')
    @service.save

    if Rails.env == "development"
      redirect_to "http://localhost:9000/#/organizations/" + @organization.id.to_s + "/account"
    else
      redirect_to "http://wwww.voluapp.com/#/organizations/" + @organization.id.to_s + "/account"
    end

  end

  def mailchimp_check
    @organization = Organization.find(params[:id])

    if @organization.organization_mailing_services.first
      render json: Mailchimp.api(@organization.organization_mailing_services.first.token).get('')
    else
      return :status => 404
    end


  end

end
