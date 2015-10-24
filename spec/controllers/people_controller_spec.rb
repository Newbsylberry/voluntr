require 'rails_helper'

RSpec.describe PeopleController, type: :controller do
  describe "POST #create" do
    before(:each) do
      @params = {"first_name"=>"CHristoo", "last_name"=>"McCarthree", "email"=>"chris@chrischris.com", "phone"=>"6107455866", "address_1"=>"6037 Hollins Ave", "city"=>"Baltimore", "state"=>"MD", "zip_code"=>"21210", "notes"=>"New Notes", "organization_id"=>"1", "person"=>{"first_name"=>"CHristoo", "last_name"=>"McCarthree", "zip_code"=>"21210", "state"=>"MD", "city"=>"Baltimore", "phone"=>"6107455866", "email"=>"chris@chrischris.com", "address_1"=>"6037 Hollins Ave"}}
    end

    it "saves person in database" do
      expect{
        post :create, person: @params}.to change(Person,:count).by(1)
    end
  end

end
