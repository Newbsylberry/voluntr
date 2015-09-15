class OpportunityInstance < ActiveRecord::Base
  belongs_to :opportunity
  attr_accessor :title, :color, :start, :end

  def instance_volunteers
    instance_volunteers = Array.new
    opportunity.person_opportunities.each do |po|
      po.instances.each do |i|
        if i > start.beginning_of_day and i < start.end_of_day
          instance_volunteers << po.person
        end
      end
    end
    return instance_volunteers
  end
end
