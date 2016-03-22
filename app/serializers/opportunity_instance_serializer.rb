class OpportunityInstanceSerializer < ActiveModel::Serializer
  attributes :id, :opportunity, :registered_instance_volunteers, :title, :color, :start, :end, :instance_date, :instance_total_recorded_hours

  def title
     if !opportunity.name.nil? && !registered_instance_volunteers.nil?
      opportunity.name + " " + registered_instance_volunteers.count.to_s + "/" + opportunity.volunteer_goal.to_s
     end
  end

end