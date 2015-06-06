  FactoryGirl.define do
    factory :opportunity do
      organization_id 1
      name "New New"

      trait :with_object_schedule do
        after(:create) do |opportunity|
          opportunity.object_schedules << create(:object_schedule)
        end
      end

      trait :with_opportunity_roles do
        after(:create) do |opportunity|
          opportunity.opportunity_roles << create(:opportunity_roles)
        end
      end
    end
  end
