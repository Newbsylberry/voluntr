RSpec.describe Organization, "Creating an organization" do
  context "When creating an organization" do

    it "should create template emails" do
      @organization = Organization.create!
      @template_emails = Array.new

      OrganizationEmailType.all.each do |oet|
        @template_emails.push(oet.name)
      end

      @organization_template_emails = Array.new
      @organization.organization_email_templates.each do |ot|
        @organization_template_emails.push(ot.organization_email_type.name)
      end

      expect(@organization_template_emails).to eq(@template_emails)
    end

  end
end