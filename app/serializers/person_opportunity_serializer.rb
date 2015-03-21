class PersonOpportunitySerializer < ActiveModel::Serializer
  attributes :id, :person_id, :opportunity_id
end
