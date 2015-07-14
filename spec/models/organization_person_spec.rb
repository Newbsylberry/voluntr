RSpec.describe OrganizationPerson, "When working with people who have volunteered at an organization" do

  context "when a person is created in the organization" do
    before(:each) do
      @person_organization = create(:organization_person)
    end

    it "a person should only be recorded in an organizations database once" do
      @person_organization.organization_id = 3
      @person_organization.person_id = 3
      @person_organization.save


      expect(OrganizationPerson.new(organization_id: 3, person_id: 3)).to_not be_valid
    end

    it "#subscribed_to_list?" do
      expect(@person_organization.subscribed_to_list?('76bfe8f643')).to eq(true)
    end

    it "#add_to_mailing_lists" do
      @person_organization = attributes_for(:organization_person)
      @person_organization["person"] = build(:person, email: Faker::Internet.email)
      @person_organization["organization"] = create(:organization, :with_organization_mailing_service)
      @po = OrganizationPerson.create(@person_organization)
      @lists = Array.new
      @lists << create(:mailing_service_list)
      expect(@po.add_to_lists(@lists).count).to eq(1)
    end

    it "#send_registration_email" do
      expect { @person_organization.send_registration_confirmation }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end






  end

end
