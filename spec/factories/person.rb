FactoryGirl.define do
  factory :person do
    email "chris.s.mccarthy@gmail.com"
    first_name "Chris"
    last_name "McCarthy"


    trait :with_recorded_hours_and_opportunity do
      after(:create) do |person|
        person.recorded_hours << create(:recorded_hour)
        person.opportunities << create(:opportunity)
      end
    end

  end
end
