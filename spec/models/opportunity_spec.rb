require 'schedule_tool'

RSpec.describe Opportunity, "Working with an opportunity" do


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


  end

end
