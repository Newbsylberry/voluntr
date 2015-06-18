FactoryGirl.define do
  factory :person do
    email "chris@christo.com"
    first_name "Chris"
    last_name "McCarthy"


    trait :with_recorded_hours do
      after(:create) do |person|
        person.recorded_hours << create(:recorded_hour)
      end
    end

  end
end
