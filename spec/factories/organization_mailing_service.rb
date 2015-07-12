FactoryGirl.define do
  factory :organization_mailing_service do
    token '95214dc904df6ecb7edb99ad045a5f5f-us11'
    service_type 'mail_chimp'
    association :organization


    trait :with_mailing_service_list do
      after(:create) do |service|
        @mailing_service_list = create(:mailing_service_list)
        service.mailing_service_lists << @mailing_service_list
        service.default_list_id = @mailing_service_list.id
      end
    end



  end
end
