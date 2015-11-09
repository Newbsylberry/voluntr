FactoryGirl.define do
    factory :opportunity do
      name "New New"
      schedule "---\n:start_time: &1 2015-06-05 22:40:51.000000000 -04:00\n:start_date: *1\n:end_time: 2015-06-06 04:40:51.000000000 -04:00\n:rrules:\n- :validations: {}\n  :rule_type: IceCube::DailyRule\n  :interval: 1\n  :count: 2\n:rtimes: []\n:extimes: []\n"
      organization_id 1
      organization

      trait :with_recorded_hours do
        after(:create) do |opportunity|
          opportunity.recorded_hours << create(:recorded_hour)
        end
      end

      trait :with_person_opportunities do
        after(:create) do |opportunity|
          opportunity.person_opportunities << create(:person_opportunity)
        end
      end

      trait :with_opportunity_roles do
        after(:create) do |opportunity|
          opportunity.opportunity_roles << create(:opportunity_roles)
        end
      end
    end
  end

