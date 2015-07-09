FactoryGirl.define do
  factory :organization do
    name "New Organization"

    trait :with_organization_mailing_service do
      after(:create) do |organization|
        organization.organization_mailing_services << create(:organization_mailing_service)
      end
    end


  end
end
