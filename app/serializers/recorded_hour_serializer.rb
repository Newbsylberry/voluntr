class RecordedHourSerializer < ActiveModel::Serializer
  attributes :id, :person_id, :opportunity_id, :hours, :person, :opportunity,
             :description, :date_recorded, :opportunity_roles
  has_one :opportunity_role

  def person
    Person.find_by_id(person_id)
  end

  def opportunity
    Opportunity.find_by_id(opportunity_id)
  end

  def opportunity_roles
    opportunity.opportunity_roles
  end

end
