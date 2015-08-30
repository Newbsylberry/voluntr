class OpportunityRoleSerializer < ActiveModel::Serializer
  attributes :id, :opportunity_id, :name, :recorded_hours, :total_recorded_hours,
             :description, :percent_filled, :person_opportunities, :volunteers_required

  def total_recorded_hours
    if recorded_hours
      recorded_hours.sum(:hours)
    else
      0
    end
  end
end
