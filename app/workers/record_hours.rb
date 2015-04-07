class RecordOrganizationHours
  @queue = :record_organization_hours_queue

  def self.perform()

    # For Each Organization
    Organization.all.each do |o|

      # Find or create a daily statistic record
      @daily_statistic = DailyStatistic.create_with(locked: false)
              .find_or_initialize_by(date: Time.now.beginning_of_day, organization_id: o.id)
      puts @daily_statistic.organization_id
      if !@daily_statistic.persisted?
        @daily_statistic.total_recorded_hours = 0
        @daily_statistic.planned_hours = 0
        @daily_statistic.total_added_volunteers = 0
      end
      o.opportunities.each do |oo|
        @recorded_hours = RecordedHour.new
        @recorded_hours.opportunity_id = oo.id

        # This needs to only interate if the schedule has an occurrence on this
        # date.
        if oo.start_schedule
          oo.person_opportunities.each do |p|
            if p.schedule
              schedule = IceCube::Schedule.from_yaml(p.schedule)
              if schedule.occurs_on?(Date.today)
                @recorded_hours.person_id = p.person_id
                @recorded_hours.hours = oo.duration
                @daily_statistic.total_planned_hours += oo.duration
                @daily_statistic.total_recorded_hours += @recorded_hours.hours
                @recorded_hours.save
              end
            end
          end
        elsif (24.hours.ago..Time.now).cover?(Time.at(oo.start_time.to_i / 1000))
          oo.person_opportunities.each do |p|
            puts p
            puts Time.now
            @recorded_hours.person_id = p.person_id
            @recorded_hours.hours = oo.duration
            @daily_statistic.total_planned_hours += oo.duration
            @daily_statistic.total_recorded_hours += @recorded_hours.hours
            @recorded_hours.save
          end
        end
      end
      o.organization_people.where(created_at: (Time.now.beginning_of_day)..Time.now).each do |p|
        @daily_statistic.total_added_volunteers += 1
      end
      puts @daily_statistic.organization_id
      puts "SAVE PLEASE"
      puts @daily_statistic
      @daily_statistic.save
    end
  end


end