class OpportunityRoleSerializer < ActiveModel::Serializer
  attributes :id, :opportunity_id, :name, :recorded_hours, :total_recorded_hours,
             :description, :percent_filled, :volunteers_required, :hours_required
  has_many :person_opportunities

end
