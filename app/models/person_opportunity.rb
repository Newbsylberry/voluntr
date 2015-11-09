class PersonOpportunity < ActiveRecord::Base
  belongs_to :person
  belongs_to :opportunity
  belongs_to :opportunity_role
  attr_accessor :total_hours





end
