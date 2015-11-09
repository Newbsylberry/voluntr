include ActiveJob::TestHelper
require "rails_helper"

RSpec.describe OpportunityWorker, "OpportunityWorker" do
  context "scheduling emails" do


    it "OpportunityWorker" do

      opportunity_1 = create(:opportunity)
      opportunity_2 = create(:opportunity)
      volunteer_1 = create(:person, email: "chris@voluapp.com")
      volunteer_2 = create(:person, email: "chris@gmail.com")
      date_1 = Time.now.next_month
      date_2 = Time.now.next_month + 30.seconds
      date_3 = Time.now.next_month + 60.seconds
      date_4 = Time.now + 3.months
      date_5 = Time.now + 2.months

      create(
          :person_opportunity,
          instances: [date_1, date_2],
          person: volunteer_1,
          opportunity: opportunity_1
      )
      create(
          :person_opportunity,
          instances: [date_3, date_4],
          person: volunteer_1,
          opportunity: opportunity_2
      )
      create(
          :person_opportunity,
          instances: [date_4],
          person: volunteer_2,
          opportunity: opportunity_1)

      expect {OpportunityWorker.perform_later}.to change { enqueued_jobs.size }.by(1)
      perform_enqueued_jobs { OpportunityWorker.perform_now }

    end
  end
end