class PersonOpportunityRecordedHour < ActiveRecord::Base
  belongs_to :opportunity
  belongs_to :person
end
