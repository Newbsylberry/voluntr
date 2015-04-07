class RecordedHour < ActiveRecord::Base
  belongs_to :organization
  belongs_to :opportunity
  belongs_to :person
end
