class RecordedHourSerializer < ActiveModel::Serializer
  attributes :id, :person_id, :opportunity_id, :hours, :person, :opportunity


  def person
    Person.find_by_id(person_id)
  end

  def opportunity
    Opportunity.find_by_id(opportunity_id)
  end

end
