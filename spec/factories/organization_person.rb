FactoryGirl.define do
  factory :organization_person do
    association :organization, :with_organization_mailing_service
    association :person, email: "chris.s.mccarthy@gmail.com"

    # trait :with_organization_and_person do
    #   after(:create) do |organization_person|
    #     organization_person.organization = create(:organization, :with_organization_mailing_service)
    #     organization_person.person = create(:person)
    #   end
    # end
  end
end
