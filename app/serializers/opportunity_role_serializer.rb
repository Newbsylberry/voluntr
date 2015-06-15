class OpportunityRoleSerializer < ActiveModel::Serializer
  attributes :id, :opportunity_id, :name, :recorded_hours, :total_recorded_hours

  def total_recorded_hours
    if recorded_hours
      recorded_hours.sum(:hours)
    else
      0
    end
  end
end
