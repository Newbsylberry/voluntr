class DailyStatistic < ActiveRecord::Base
  belongs_to :organization
  after_initialize do |daily_statistic|
    if daily_statistic.new_record?
      daily_statistic.total_added_volunteers = 0
      daily_statistic.total_recorded_hours = 0
      daily_statistic.planned_hours = 0
    end
  end
end
