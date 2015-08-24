class OpportunityRole < ActiveRecord::Base
  include Elasticsearch::Model
  belongs_to :opportunity
  has_many :recorded_hours
  has_many :person_opportunities

  def percent_filled
    if !person_opportunities.empty? && !volunteers_required.nil?
    ((self.person_opportunities.count.to_f/self.volunteers_required.to_f)*100).to_i
    end
  end
end
