class OpportunityInstanceSerializer < ActiveModel::Serializer
  attributes :id, :opportunity, :instance_volunteers, :title, :color, :start, :end, :instance_date

  def title
    opportunity.name + " " + instance_volunteers.count.to_s + "/" + opportunity.volunteer_goal.to_s
  end

end