FactoryGirl.define do
  factory :object_schedule do
    scheduleable_type 'Opportunity'
    scheduleable_id 1
    schedule "---\n:start_time: &1 2015-06-05 22:40:51.000000000 -04:00\n:start_date: *1\n:end_time: 2015-06-06 04:40:51.000000000 -04:00\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::DailyRule\n  :interval: 1\n  :count: 2\n:rtimes: []\n:extimes: []\n"
  end
end
