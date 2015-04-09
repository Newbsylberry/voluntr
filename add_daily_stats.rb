@organization = Organization.first
@organization.posts.each do |p|
  @daily_statistic =
      DailyStatistic.create_with(locked: false)
          .find_or_initialize_by(date: p.post_time.beginning_of_day, organization_id: p.organization_id)
      @daily_statistic.total_recorded_hours = rand(1..6)
      @daily_statistic.planned_hours = rand(@daily_statistic.total_recorded_hours..
                                                @daily_statistic.total_recorded_hours + 2)
      @daily_statistic.total_added_volunteers = rand(0..4)
      @daily_statistic.save
end