FactoryGirl.define do
  factory :recorded_hour do
    person_id 1
    hours 3
    association :opportunity
    association :person
    date_recorded '2015-06-05 22:40:51.000000000 -04:00'

    trait :with_person_and_opportunity do
      after(:create) do |recorded_hour|
        recorded_hour.person << create(:person)
        recorded_hour.opportunity << create(:opportunity)
      end
    end
  end
end
