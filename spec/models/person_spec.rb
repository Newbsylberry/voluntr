RSpec.describe Person, "Working with the people model" do
  context "When creating a person" do
    before(:each) do
      @person = Person.create(email: "steve@steve.com")
    end

    it "should not create a person if there is already a person with that email address registered" do
      expect(Person.new(email:"steve@steve.com")).to_not be_valid
    end

    it "#add_to_organization" do
      @person = create(:person)
      organization = create(:organization)

      @person.add_to_organization(organization)
      expect(@person.organizations).to include(organization)
    end


    pending "It should create an organization person if an organization id is present and the record doesn't already exist"

  end

  context "When displaying people" do
    before(:each) do
      @person = create(:person, :with_recorded_hours_and_opportunity, email: "newemail@email.com")
    end

    it "#total_hours" do
      expect(@person.total_recorded_hours).to eq(3)
    end

    it "#all_related_opportunities" do
      @opportunities = Array.new
      @total_hours = 0
      @opportunity1 = @person.recorded_hours.first.opportunity
      @opportunity2 = create(:opportunity, name: "New Opportunity")
      @person.opportunities.push(@opportunity2)

      @person.all_related_opportunities.each do |po|
        @opportunities.push(po.opportunity)
        @total_hours += po.total_hours
      end


      expect(@total_hours).to eq(3)
      expect(@opportunities).to include(@opportunity1 && @opportunity2 && @person.opportunities.first)

    end

    pending "should show only opportunities registered for"

  end
end