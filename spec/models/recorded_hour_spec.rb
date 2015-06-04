RSpec.describe RecordedHour, "Working with recorded hours" do

  context "when recording hours" do
    before(:each) do
      @recorded_hours = RecordedHour.new
    end

    it "a person should not be able to sign into an event twice in the same day" do
      @recorded_hours.opportunity_id = 3
      @recorded_hours.person_id = 3
      @recorded_hours.save


      RecordedHour.new(opportunity_id: 3, person_id: 3).should_not be_valid
    end




    end

  end
