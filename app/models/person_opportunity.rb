class PersonOpportunity < ActiveRecord::Base
  belongs_to :person
  belongs_to :opportunity
end
