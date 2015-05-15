class RecordOrganizationHours
  @queue = :record_organization_hours_queue

  def self.perform()



    # For Each Organization
    Organization.all.each do |o|

      # Find or create a daily statistic record
      @daily_statistic = DailyStatistic.create_with(locked: false)
                             .find_or_initialize_by(date: Time.now.beginning_of_day, organization_id: o.id)


      # If it hasn't been saved in the database already, set base values
      if !@daily_statistic.persisted?
        @daily_statistic.total_recorded_hours = 0
        @daily_statistic.planned_hours = 0
        @daily_statistic.total_added_volunteers = 0
      end


      # For each of the organization's opportunity
      o.opportunities.each do |oo|

        # create an empty recorded hour
        @recorded_hours = RecordedHour.new
        @recorded_hours.opportunity_id = oo.id

        # This needs to only iterate if the schedule has an occurrence on this
        # date.
        if oo.start_schedule
          schedule = IceCube::Schedule.from_yaml(oo.start_schedule)
          if schedule.occurs_on?(Date.today)

            # Add planned hours since there was an event planned on the day
            @daily_statistic.planned_hours += oo.duration

            # are there people assigned to this opportunity?
            oo.person_opportunities.each do |p|
              puts p
              # create a schedule from the persons opportunity and check to see if they
              # are scheduled for today.
              if p.schedule
                schedule = IceCube::Schedule.from_yaml(p.schedule)

                if schedule.occurs_on?(Date.today)
                  puts schedule.to_s

                  # record hours and add to statistics if yes
                  @recorded_hours.person_id = p.person_id
                  @recorded_hours.hours = oo.duration
                  @daily_statistic.total_recorded_hours += @recorded_hours.hours

                  @recorded_hours.save
                end
              end
            end
          end

          # if not an event with a schedule, check to see if it lands on today
        elsif (Time.now.beginning_of_day..Time.now.end_of_day).cover?(Time.at(oo.start_time.to_i / 1000))


          # Add planned hours since there was an event planned on the day
          @daily_statistic.planned_hours += oo.duration

          # Record people assigned to this event
          oo.person_opportunities.each do |p|

            @recorded_hours.person_id = p.person_id
            @recorded_hours.hours = oo.duration
            @daily_statistic.total_recorded_hours += @recorded_hours.hours
            @recorded_hours.save
          end
        end
      end

      # add people who were added to the platform today
      o.organization_people.where(created_at: (Time.now.beginning_of_day)..Time.now).each do |p|
        @daily_statistic.total_added_volunteers += 1

      end
      @daily_statistic.save
    end
  end


end