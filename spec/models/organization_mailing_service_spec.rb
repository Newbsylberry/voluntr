require 'rails_helper'

RSpec.describe OrganizationMailingService, "Working with a mailing service" do
  context "creating and updating lists" do
    it "#update_or_create_lists" do
      @mailing_service = create(:organization_mailing_service)
      @mailing_service.update_or_create_lists
      expect(@mailing_service.mailing_service_lists.count).to eq(1)
    end
  end
end
