FactoryGirl.define do
  factory :opportunity_roles do
    opportunity_id 1
    name "Role 1"
    association :opportunity

  end
end
