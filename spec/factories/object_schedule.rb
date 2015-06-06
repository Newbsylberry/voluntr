FactoryGirl.define do
  factory :object_schedule do
    scheduleable_type 'Opportunity'
    scheduleable_id 1
    schedule "---\n:start_time: &1 2015-06-05 16:00:05.000000000 -04:00\n:start_date: *1\n:end_time: 2015-06-05 20:00:05.000000000 -04:00\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::DailyRule\n  :interval: 1\n  :until: 2015-06-08 00:00:00.000000000 -04:00\n:rtimes: []\n:extimes: []\n"
  end
end
