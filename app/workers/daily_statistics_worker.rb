class DailyStatisticsWorker < ActiveJob::Base
  queue_as :low_priority

  #

  def perform
    Organization.all.each do |o|
      @daily_statistic = DailyStatistic.create_with(locked: false)
                             .find_or_initialize_by(date: (Time.now - 1.hour).beginning_of_day,
                                                    organization_id: o.id)
      if !@daily_statistic.persisted?
        @daily_statistic.save
      end
    end
  end
end