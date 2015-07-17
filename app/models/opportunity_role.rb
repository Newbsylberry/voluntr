class OpportunityRole < ActiveRecord::Base
  include Elasticsearch::Model
  belongs_to :opportunity
  has_many :recorded_hours
end
