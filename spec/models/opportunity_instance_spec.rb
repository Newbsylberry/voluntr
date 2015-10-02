require 'rails_helper'

RSpec.describe OpportunityInstance, type: :model do
  context "opportunity_instance" do
    it "#instance_volunteers" do
      @opportunity = create(:opportunity, schedule: "---\n:start_time: &1 2015-07-12 21:54:30.117844000 -06:00\n:start_date: *1\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::DailyRule\n  :interval: 1\n  :until: 2015-07-19 22:18:09.539033000 -06:00\n- :validations: {}\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n  :until: 2015-07-19 22:18:09.539136000 -06:00\n- :validations: {}\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n")
      @person = create(:person)
      @person_opportunity = create(:person_opportunity,
                                   person_id: @person.id,
                                   opportunity_id: @opportunity.id,
                                   instances: ["2015-08-12 22:33:07 -0600"])

      @instance = create(:opportunity_instance, opportunity_id: @opportunity.id, instance_date: "2015-08-12 22:33:07 -0600")

      expect(@instance.instance_volunteers).to include(@person_opportunity.person)
    end
  end
end
