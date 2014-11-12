class Event < ActiveRecord::Base
  has_many :user_event_hours

end
