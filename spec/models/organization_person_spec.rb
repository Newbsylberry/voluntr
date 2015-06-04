RSpec.describe OrganizationPerson, "When working with people who have volunteered at an organization" do

  context "when a person is created in the organization" do
    before(:each) do
      @person_organization = OrganizationPerson.new
    end

    it "a person should only be recorded in an organizations database once" do
      @person_organization.organization_id = 3
      @person_organization.person_id = 3
      @person_organization.save


      OrganizationPerson.new(organization_id: 3, person_id: 3).should_not be_valid
    end




  end

end
