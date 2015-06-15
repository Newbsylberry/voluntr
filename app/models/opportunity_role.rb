class OpportunityRole < ActiveRecord::Base
  belongs_to :opportunity
  has_many :recorded_hours
end
