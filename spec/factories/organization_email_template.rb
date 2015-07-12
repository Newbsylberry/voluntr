FactoryGirl.define do
  factory :organization_email_template do
    association :organization

    # trait :with_organization_and_person do
    #   after(:create) do |organization_person|
    #     organization_person.organization = create(:organization, :with_organization_mailing_service)
    #     organization_person.person = create(:person)
    #   end
    # end
  end
end
