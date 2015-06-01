RSpec.describe Opportunity, "Working with an opportunity" do

  context "accessing an opportunity" do

    it "should have template emails" do
      @opportunity = Opportunity.create!
      @opportunity.organization = Organization.create!
      @templates = Array.new
      @opportunity_templates = Array.new
      @opportunity.organization.organization_email_templates.each do |oet|
        @templates.push(oet.organization_email_type.name)
      end
      @opportunity.organization_email_templates.each do |oet|
        @opportunity_templates.push(oet.organization_email_type.name)
      end
      expect(@opportunity_templates).to eq(@templates)
    end
  end

end
