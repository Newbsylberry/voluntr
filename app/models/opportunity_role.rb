class OpportunityRole < ActiveRecord::Base
  include Elasticsearch::Model
  belongs_to :opportunity
  has_many :recorded_hours
  has_many :person_opportunities
  has_many :people, through: :recorded_hours

  def percent_filled
    if !person_opportunities.empty? && !volunteers_required.nil?
    ((self.person_opportunities.count.to_f/self.volunteers_required.to_f)*100).to_i
    end
  end

  def total_recorded_hours
    if recorded_hours
      recorded_hours.sum(:hours)
    else
      0
    end
  end

  def total_people
    if !people.blank?
      people.count
    end
  end
end
