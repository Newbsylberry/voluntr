class OpportunityRoleSerializer < ActiveModel::Serializer
  attributes :id, :opportunity_id, :name, :recorded_hours, :total_recorded_hours,
             :description, :percent_filled, :person_opportunities, :volunteers_required, :hours_required

end
