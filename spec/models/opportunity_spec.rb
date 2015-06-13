require 'schedule_tool'

RSpec.describe Opportunity, "Working with an opportunity" do

  context "creating an opportunity" do

    before(:each) do
      @opportunity = Opportunity.create!(name: "New Opportunity")
    end

    it "should have a name" do
      expect(@opportunity.name).to eq("New Opportunity")
    end

  end

  context "accessing an opportunity" do
    before(:each) do
      @params = {
          calendar:  {
              start_time: 1433121367000,
              end_time: 1433124967000,
          }
      }
      @schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))
      @opportunity = Opportunity.create!
      @opportunity.object_schedules.new(schedule: @schedule.to_yaml)
    end

    it "should have template emails" do
      @opportunity.organization = Organization.create!
      @templates = Array.new
      @opportunity_templates = Array.new
      @opportunity.organization.organization_email_templates.each do |oet|
        @templates.push(oet.organization_email_type.name)
      end
      @opportunity.organization_email_templates.each do |oet|
        @opportunity_templates.push(oet.organization_email_type.name)
      end
      expect(@opportunity_templates).to eq(@templates)
    end


    it "should have a start time" do
      expect(@opportunity.start_time).to eq('2015-05-31 21:16:07 -0400')
    end

    it "should have a duration time" do
      expect(@opportunity.duration).to eq(1)
    end

    it "#total_recorded_hours" do
      expect(create(:opportunity, :with_object_schedule_and_recorded_hours).total_recorded_hours).to eq(3)
    end

    it "#total_people_recording" do
      expect(create(:opportunity, :with_object_schedule_and_recorded_hours).total_people_recording).to eq(1)
    end

    it "#instance_people_recording" do
      expect(create(:opportunity, :with_object_schedule_and_recorded_hours)
                 .instance_people_recording('2015-06-05 22:40:51.000000000 -04:00')).to eq(1)
    end

    it "#instance_recorded_hours" do
      expect(create(:opportunity, :with_object_schedule_and_recorded_hours)
                 .instance_recorded_hours('2015-06-05 22:40:51.000000000 -04:00')).to eq(3)
    end

    it "#instances_statistic_summary" do
      expect(create(:opportunity, :with_object_schedule_and_recorded_hours)
                 .instances_statistics.count).to eq(2)
    end

    it "#instances_statistic_summary recorded_hours" do
      expect(create(:opportunity, :with_object_schedule_and_recorded_hours)
                 .instances_statistics.first.instance_hours).to eq(3)

    end

    it "#instances_statistic_summary instance_people_count" do
      expect(create(:opportunity, :with_object_schedule_and_recorded_hours)
                 .instances_statistics.last.instance_people_count).to eq(0)
    end

  end

end
