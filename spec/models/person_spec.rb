RSpec.describe Person, "Working with the people model" do
  context "When creating a person" do
    before(:each) do
      @person = Person.create(email: "steve@steve.com")
    end

    it "should not create a person if there is already a person with that email address registered" do
      expect(Person.new(email:"steve@steve.com")).to_not be_valid
    end


    pending "It should create an organization person if an organization id is present and the record doesn't already exist"

  end

  context "When displaying people" do
    before(:each) do
      @person = create(:person, :with_recorded_hours, email: "newemail@email.com")
    end

    it "#total_hours" do
      expect(@person.total_recorded_hours).to eq(3)
    end

  end
end