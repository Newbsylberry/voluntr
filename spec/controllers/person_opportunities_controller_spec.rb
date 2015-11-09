require 'rails_helper'

RSpec.describe PersonOpportunitiesController, type: :controller do
  describe "POST #create" do
    before(:each) do
      create(:organization, id: 2)
      create(:opportunity, id: 1)
      @params = {"opportunity_id"=>"9", "first_name"=>"Chris", "last_name"=>"McCarthy", "email"=>"chris@voluapp.com", "instances"=>["2015-11-21T15:00:00.000Z", "2016-01-02T15:00:00.000Z", "2016-01-16T15:00:00.000Z"], "organization_id"=>2, "person_opportunity"=>{"opportunity_id"=>"9", "instances"=>["2015-11-21T15:00:00.000Z", "2016-01-02T15:00:00.000Z", "2016-01-16T15:00:00.000Z"]}}
    end

    it "creates person opportunity" do

      expect{
        post :create, person_opportunity: @params}.to change(PersonOpportunity,:count).by(1)
    end
  end

end

