class ObjectSchedule < ActiveRecord::Base
  belongs_to :scheduleable, polymorphic: true
end
