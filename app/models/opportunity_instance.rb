class OpportunityInstance < ActiveRecord::Base
  belongs_to :opportunity
  attr_accessor :title, :color, :start, :end

  def start
    instance_date
  end

  def instance_volunteers
    instance_volunteers = Array.new
    if !opportunity.person_opportunities.nil?
      opportunity.person_opportunities.each do |po|
        if !po.instances.nil?
          po.instances.each do |i|
            if i > start.beginning_of_day and i < start.end_of_day
              instance_volunteers << po.person
            end
          end
        end
      end
    end
    return instance_volunteers
  end
end
