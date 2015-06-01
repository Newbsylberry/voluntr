require 'spec_helper'
require 'schedule_params'



RSpec.describe SchedulerTool, "Create a schedule" do

  context "For a schedule that doesn't repepat" do

    it "Creates a schedule that doesn't repeat" do
      params = {
          calendar:  {
              repeating_event: false,
              start_time: 1433121367000,
              end_time: 1433124967000,
          }
      }

      @object_schedule = SchedulerTool.schedule_from_params(params, Opportunity.new)

      schedule = IceCube::Schedule.from_yaml(@object_schedule)

      expect(schedule.rrules.length).to eq(0)


    end

    it "Creates a schedule that doesn't repeat" do
      params = {
          calendar:  {
              repeating_event: true,
              start_time: 1433121367000,
              end_time: 1433124967000,
          repeat: {
              repeat_daily: true
          }
          }
      }

      @object_schedule = SchedulerTool.schedule_from_params(params, Opportunity.new)

      schedule = IceCube::Schedule.from_yaml(@object_schedule)

      expect(schedule.rrules.length).to eq(1)


    end
  end
end