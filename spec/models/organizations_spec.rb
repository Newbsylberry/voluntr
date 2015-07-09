RSpec.describe Organization, "Creating an organization" do
  context "When creating an organization" do
    before(:each) do
      @organization = create(:organization)
      @organization.organization_mailing_services = Array.new
      @organization.organization_mailing_services <<
          create(:organization_mailing_service, :with_mailing_service_list)
    end


    # it "should create template emails" do
    #   @organization = Organization.create!
    #   @template_emails = Array.new
    #
    #   OrganizationEmailType.all.each do |oet|
    #     @template_emails.push(oet.name)
    #   end
    #
    #   @organization_template_emails = Array.new
    #   @organization.organization_email_templates.each do |ot|
    #     @organization_template_emails.push(ot.organization_email_type.name)
    #   end
    #
    #   expect(@organization_template_emails).to eq(@template_emails)
    # end

    it "#default_list" do
      expect(@organization.default_list("mail_chimp").list_id).to eq('76bfe8f643')

    end



  end
end