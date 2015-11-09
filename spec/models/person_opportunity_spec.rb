include ActiveJob::TestHelper
require "rails_helper"

RSpec.describe PersonOpportunity, "Working with a PersonOpportunity" do
  context "working_with_a_person_opportunity" do
    before(:each) do
      date_1 = Time.now + 1.week
      date_2 = Time.now + 3.weeks
      date_3 = Time.now + 6.3.weeks
      date_4 = Time.now + 6.2.weeks
      @instances = [date_1.to_s, date_2.to_s, date_3.to_s, date_4.to_s]
      clear_enqueued_jobs
    end
    let(:person_opportunity) { create(:person_opportunity, instances: @instances.to_s) }




  end
end