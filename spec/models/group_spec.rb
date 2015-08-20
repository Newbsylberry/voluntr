require 'rails_helper'

RSpec.describe Group, "Group" do
  context "create" do
    before(:each ) do
      @group = create(:group)
    end
    it "#create" do
      expect(@group.name).to eq("Volunteer Group")
    end

    # it "#create_with_administrators" do
    #   @people = Array.new
    #   @person = Hash.new
    #   @organization = create(:organization)
    #   @person["email"] = "chris@voluapp.com"
    #   @person["first_name"] = "Chris"
    #   @person["last_name"] = "McCarthy"
    #   @group = Hash.new
    #   @group["name"] = "New Group"
    #   @people.push(@person)
    #   @group = Group.create_with_administrators(@group, @person, @organization)
    #
    #   expect(@group.people).to include(@person)
    # end

  end
end
