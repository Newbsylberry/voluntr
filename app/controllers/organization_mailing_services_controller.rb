class OrganizationMailingServicesController < ApplicationController
  include Mailchimp

  def show
    @organization_mailing_service = OrganizationMailingService.find(params[:id])
  end



  def mailchimp_callback
    @organization = Organization.find(Base64.decode64(params[:state]))


    client = Mailchimp.client('https://login.mailchimp.com')

    if Rails.env == "development"
      token = client.auth_code.get_token(params["code"],
                                         :redirect_uri => 'https://127.0.0.1:3000/api/v1/auth/mailchimp_callback',
                                         :headers => {'grant_type' => 'authorization_code'})
    else
      token = client.auth_code.get_token(params["code"],
                                         :redirect_uri => 'https://www.voluapp.com/api/v1/auth/mailchimp_callback',
                                         :headers => {'grant_type' => 'authorization_code'})
    end

    metadata = token.get('/oauth2/metadata')
    json = JSON.parse(metadata.body)


    @service = OrganizationMailingService.create_with(locked: false).
        find_or_initialize_by(organization_id: @organization.id, token: token.token + "-" + json["dc"], service_type: 'mail_chimp')

    @service.save

    @service.update_or_create_lists

    @service.default_list_id = @service.mailing_service_lists.first.id

    @service.save


    if Rails.env == "development"
      redirect_to "http://localhost:9000/#/organizations/" + @organization.id.to_s + "/account"
    else
      redirect_to "http://www.voluapp.com/#/organizations/" + @organization.id.to_s + "/account"
    end

  end

  def mailchimp_check
    @organization = Organization.find(params[:id])
    if @organization.organization_mailing_services.first
      ap "Call"
      render json: Mailchimp.api(@organization.organization_mailing_services.first.token).get('')
    else
      return :status => 404
    end
  end

  def update
    @organization_mailing_service = OrganizationMailingService.find(params[:id])



    @organization_mailing_service.update(organization_mailing_service_params)



    render json: @organization_mailing_services
  end

  def destroy
    @organization_mailing_service = OrganizationMailingService.find(params[:id])
    @organization_mailing_service.destroy

    head :no_content
  end

  protected

  def organization_mailing_service_params
    params.require(:organization_mailing_service).permit(:id, :default_list_id, :token)
  end


end
