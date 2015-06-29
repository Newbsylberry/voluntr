class PersonOpportunity < ActiveRecord::Base
  belongs_to :person
  belongs_to :opportunity
  attr_accessor :total_hours






end
