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

    trait :with_organizations do
      after(create) do |person|
        person.organization = create(:organization, :with_organization_mailing_service)
      end
    end

  end
end
