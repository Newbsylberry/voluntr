class PersonOpportunitySerializer < ActiveModel::Serializer
  attributes :id, :person_id, :opportunity_id, :total_hours, :person, :opportunity

  def person
    return Person.find(person_id)
  end

  def opportunity
    return Opportunity.find(opportunity_id)
  end

end
