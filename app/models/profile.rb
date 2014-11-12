class Profile < ActiveRecord::Base
  belongs_to :user
  has_many :user_event_hours, through: :user


  def total_hours
    @total_hours = 0
    user_event_hours.each do |ueh|
      @total_hours += ueh.hours
    end
    return @total_hours
  end
end
