  FactoryGirl.define do
    factory :opportunity do
      organization_id 1
      name "New New"

      trait :with_object_schedule do
        after(:create) do |opportunity|
          opportunity.object_schedules << create(:object_schedule)
        end
      end
    end
  end
