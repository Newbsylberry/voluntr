require 'schedule_tool'

RSpec.describe Opportunity, "Working with an opportunity" do

  context "creating an opportunity" do
    before(:each) do
      # @opportunity = create(:opportunity)
      @params = {
          calendar:  {
              start_time: 1433121367000,
              end_time: 1433124967000,
          }
      }
    end


    it "#create_schedule" do

    end


  end

  context "accessing an opportunity" do
    before(:each) do
      @opportunity = create(:opportunity, :with_recorded_hours)
    end

    # it "should have template emails" do
    #   @opportunity.organization = Organization.create!
    #   @templates = Array.new
    #   @opportunity_templates = Array.new
    #   @opportunity.organization.organization_email_templates.each do |oet|
    #     @templates.push(oet.organization_email_type.name)
    #   end
    #   @opportunity.organization_email_templates.each do |oet|
    #     @opportunity_templates.push(oet.organization_email_type.name)
    #   end
    #   expect(@opportunity_templates).to eq(@templates)
    # end

    it "#name" do
      expect(@opportunity.name).to eq("New New")
    end

    it "#start_time" do
      expect(@opportunity.start_time).to eq('2015-06-05 22:40:51 -0400')
    end

    it "duration" do
      expect(@opportunity.duration).to eq(6.0)
    end

    it "#total_recorded_hours" do
      expect(@opportunity.total_recorded_hours).to eq(3)
    end

    it "#total_people_recording" do
      expect(@opportunity.total_people_recording).to eq(1)
    end

    it "#instance_people_recording" do
      expect(@opportunity.instance_people_recording('2015-06-05 22:40:51.000000000 -04:00')).to eq(1)
    end

    it "#instance_recorded_hours" do
      expect(@opportunity.instance_recorded_hours('2015-06-05 22:40:51.000000000 -04:00')).to eq(3)
    end

    it "#instances_statistic_summary" do
      expect(@opportunity.instances_statistics.count).to eq(2)
    end

    it "#instances_statistic_summary recorded_hours" do
      expect(@opportunity.instances_statistics.first.instance_hours).to eq(3)

    end



    it "#instances_statistic_summary instance_people_count" do
      expect(@opportunity.instances_statistics.last.instance_people_count).to eq(0)
    end

    it "#generate_report" do
      # expect(@opportunity.instances_statistics.last.instance_people_count).to eq(0)
    end

  end

  context "when a user wants to delete an event" do
    before(:each) do
      @opportunity = create(:opportunity, schedule: "---\n:start_time: &1 2015-07-12 21:54:30.117844000 -06:00\n:start_date: *1\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::DailyRule\n  :interval: 1\n  :until: 2015-07-19 22:18:09.539033000 -06:00\n- :validations: {}\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n  :until: 2015-07-19 22:18:09.539136000 -06:00\n- :validations: {}\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n")
      @instance_dates = Array.new


      SchedulerTool.list_of_instances(
          @opportunity, "2015-07-12 21:54:30.117844000",
          "2015-08-12 21:54:30.117844000").each do |i| @instance_dates.push(i.instance_date) end
      ap @instance_dates
    end

    it "#delete_instance" do
      @opportunity.delete_instance("2015-07-15 21:54:30 -0600")

      @instance = create(:opportunity_instance,
                         opportunity_id: @opportunity.id,
                         id: @opportunity.id,
                         instance_date: "2015-07-15 21:54:30 -0600")


      expect(@instance_dates)
          .to_not include(@instance.instance_date)
    end

    it "#delete_future_instances" do
      @opportunity.delete_future_instances("2015-07-15 21:54:30 -0600")

      @instance_dates = Array.new
      SchedulerTool.list_of_instances(
          @opportunity, "2015-07-12 21:54:30.117844000",
          "2015-08-12 21:54:30.117844000").each do |i| @instance_dates.push(i.instance_date) end

      ap @instance_dates

      expect(@instance_dates.count)
          .to eq(4)
    end
  end

end
