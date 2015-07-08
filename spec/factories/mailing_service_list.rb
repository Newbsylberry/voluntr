FactoryGirl.define do
  factory :mailing_service_lists do
    list_id '76bfe8f643'
    name "Volunteers"
    current_subscribers 0
    association :organization_mailing_service

  end
end
