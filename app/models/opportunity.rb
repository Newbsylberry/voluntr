class Opportunity < ActiveRecord::Base
  has_many :user_event_hours
  has_many :person_opportunities
  has_many :people, through: :person_opportunities


end
