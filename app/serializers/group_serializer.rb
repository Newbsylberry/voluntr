class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :city, :state, :recorded_hours, :total_recorded_hours,
             :total_opportunities, :total_people, :opportunities, :opportunity_ids
  has_many :recorded_hours

  def opportunity_ids
    opportunity_ids = Array.new
    opportunities.each do |o|
      opportunity_ids << o.id
    end
    return opportunity_ids
  end




end
