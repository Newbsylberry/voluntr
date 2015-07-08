FactoryGirl.define do
  factory :organization_mailing_service do
    token '95214dc904df6ecb7edb99ad045a5f5f-us11'
    service_type 'mail_chimp'
    association :organization

    trait :with_mailing_service_list do
      after(:create) do |service|
        service.mailing_service_lists = Array.new
      end
    end



  end
end
