RSpec.describe RecordedHour, "Working with recorded hours" do

  context "when recording hours" do


    context "when a person is recording hours at an event" do


    #   it "a person should not be able to sign into an event twice on the same day" do
    #     create(:recorded_hour, opportunity_id: 1, person_id: 1, date_recorded: '2015-06-06 18:00:00 -0400')
    #     expect(build(:recorded_hour, opportunity_id: 1, person_id: 1, date_recorded: '2015-06-06 18:00:00 -0400')).to_not be_valid
    #   end
    #
    #   it "a person should be able to sign into multiple instances of the same event" do
    #     create(:recorded_hour, opportunity_id: 1, person_id: 1, date_recorded: '2015-06-06 18:00:00 -0400')
    #     expect(create(:recorded_hour, opportunity_id: 1, person_id: 1, date_recorded: '2015-06-05 18:00:00 -0400')).to be_valid
    #   end
    # end

    it "#send_sign_in_email" do


        expect { build(:recorded_hour, :with_person_and_opportunity).send_sign_in_email }.to change { ActionMailer::Base.deliveries.count }.by(1)

    end






    end
  end
end

