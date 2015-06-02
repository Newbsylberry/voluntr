require 'spec_helper'
require 'schedule_tool'



RSpec.describe SchedulerTool, "Working with an objects schedules" do
  before(:each) do
    @params = {
        calendar:  {
            start_time: 1433121367000,
            end_time: 1433124967000,
        }
    }
  end

  context "When a user wants to create a single event" do
    it "creates a schedule that doesn't repeat" do
      @params[:calendar][:repeating_event] = false

      schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

      expect(schedule.rrules.length).to eq(0)

    end

    it "creates a schedule with a start time" do
      schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

      expect(schedule.start_time).to eq('2015-05-31 21:16:07 -0400')

    end

    it "creates a schedule with an end time" do
      schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

      expect(schedule.end_time).to eq('2015-05-31 22:16:07 -0400')
    end

    it "creates a schedule with a duration" do
      schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

      expect(schedule.duration).to eq(3600)
    end

  end

  context "when a user wants to create a recurring schedule" do
    before(:each) do
      @params[:calendar][:repeating_event] = true
      @params[:calendar][:repeat] = Hash.new
    end


    context "when a user wants to create a schedule that repeats every day" do
      before(:each) do
        @params[:calendar][:repeat][:repeat_daily] = true
      end

      it "it creates a schedule that repeats daily" do
        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |r|

          expect(r[:rule_type]).to eq("IceCube::DailyRule")
        end

      end

      it "it creates a schedule that repeats every 5 day" do
        @params[:calendar][:repeat][:repeat_count] = 5

        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |r|
          expect(r[:interval]).to eq(5)
        end

      end

      it "it creates a schedule that ends after 5 instances" do
        @params[:calendar][:repeat][:number_of_repeats] = 5

        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |r|
          expect(r[:count]).to eq(5)
        end

      end

      it "it creates a schedule that ends on July 4" do
        @params[:calendar][:repeat][:repeat_until] = 1435968030000

        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |r|
          expect(r[:until]).to eq('2015-07-03 20:00:30 -0400')
        end
      end





    end

    context "when user wants to create a schedule that repeats weekly" do
      before(:each) do
        @params[:calendar][:repeat][:repeat_weekly] = true
      end

      it "creates a schedule that repeats weekly" do
        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |r|
          expect(r[:rule_type]).to eq("IceCube::WeeklyRule")
        end



      end

      it "creates a schedule that repeats on Tuesday and Thursday." do
        @params[:calendar][:repeat][:tuesday_repeat] = true
        @params[:calendar][:repeat][:thursday_repeat] = true

        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |rr|

          expect(rr[:validations][:day]).to eq([2,4])
        end



      end

    end


    context "When a user wants to create a schedule that repeats monthly" do
      before(:each) do
        @params[:calendar][:repeat][:repeat_monthly] = true
      end

      it "creates a schedule that repeats monthly" do

        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |r|

          expect(r[:rule_type]).to eq("IceCube::MonthlyRule")
        end


      end


    end

    context "When a user wants to create a schedule that repeats yearly" do
      before(:each) do
        @params[:calendar][:repeat][:repeat_yearly] = true
      end

      it "creates a schedule that repeats yearly" do

        schedule = IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(@params, Opportunity.new))

        schedule.to_hash[:rrules].each do |r|

          expect(r[:rule_type]).to eq("IceCube::YearlyRule")
        end


      end

    end

  end

  context "When a user wants to see a calendar with the schedule" do
    before(:each) do

    end

    it "Should be able to see an organizations entire schedule" do

    end


  end


end