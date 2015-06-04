RSpec.describe Person, "Working with the people model" do
  context "When creating a person" do
    before(:each) do
      @person = Person.create(email: "steve@steve.com")
    end
    pending "It should not create a person if there is already a person with that email address registered"

    it "should not create a person if there is already a person with that email address registered" do
      Person.new(email:"steve@steve.com").should_not be_valid
    end


    pending "It should create an organization person if an organization id is present and the record doesn't already exist"

  end
end