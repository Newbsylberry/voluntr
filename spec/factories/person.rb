FactoryGirl.define do
  factory :person do
    @schedules = Hash.new
    @schedules["morning_schedule"] = "---\n:start_time: &1 2015-07-14 06:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 12:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
    @schedules["afternoon_schedule"] = "---\n:start_time: &1 2015-07-14 12:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 18:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
    @schedules["night_schedule"] = "---\n:start_time: &1 2015-07-14 18:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-15 00:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
    email "chris.s.mccarthy@gmail.com"
    first_name "Chris"
    last_name "McCarthy"
    schedule @schedule


    trait :with_recorded_hours_and_opportunity do
      after(:create) do |person|
        person.recorded_hours << create(:recorded_hour)
        person.opportunities << create(:opportunity)
      end
    end

    trait :with_organizations do
      after(create) do |person|
        person.organization = create(:organization, :with_organization_mailing_service)
      end
    end

  end
end
