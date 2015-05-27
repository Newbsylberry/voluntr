module SchedulerTool
  include IceCube

  def SchedulerTool.schedule_from_params(params, object)

    @days = Array.new
    if params[:calendar][:repeat][:monday_repeat]
      @days.push(1)
    end
    if params[:calendar][:repeat][:tuesday_repeat]
      @days.push(2)
    end
    if params[:calendar][:repeat][:wednesday_repeat]
      @days.push(3)
    end
    if params[:calendar][:repeat][:thursday_repeat]
      @days.push(4)
    end
    if params[:calendar][:repeat][:friday_repeat]
      @days.push(5)
    end
    if params[:calendar][:repeat][:saturday_repeat]
      @days.push(6)
    end
    if params[:calendar][:repeat][:sunday_repeat]
      @days.push(7)
    end


    # If the object has existing schedules, and this schedule is replacing a current
    # schedule:
    if !object.object_schedules.empty?
      object.object_schedules.each do |os|
        schedule = IceCube::Schedule.from_yaml(os.schedule)

        # If the schedule has rules which define it repeat endlessly
        if schedule.recurrence_rules && !os.outdated?
          schedule.recurrence_rules.each do |rr|

            # Chance the until for the rule until the day before the new schedule
            rr.until(Time.at(params[:calendar][:start_time].to_i  / 1000).yesterday)

            # If the schedule hasn't started yet, then destroy it
            if schedule.start_time > Time.at(params[:calendar][:start_time].to_i / 1000)
              os.destroy!

            else
              # otherwise save the schedule
              os.outdated = true;
              os.schedule = schedule.to_yaml
              os.save
            end
          end
        end
      end
    end


    if params[:calendar][:repeating_event] === true
      @start_schedule = Schedule.new( Time.at(params[:calendar][:start_time].to_i / 1000 ))
      @start_schedule.end_time = params[:calendar][:end_time]



      # If the schedule repeats Daily
      if params[:calendar][:repeat][:repeat_daily] == true &&
          params[:calendar][:repeat][:repeat_count].blank?
        rule = @start_schedule.add_recurrence_rule Rule.daily
      elsif params[:calendar][:repeat][:repeat_daily] == true &&
          !params[:calendar][:repeat][:repeat_count].blank?
        rule = @start_schedule.add_recurrence_rule Rule.daily(params[:calendar][:repeat][:repeat_count])
      end




      # If the schedule repeats Weekly
      if params[:calendar][:repeat][:repeat_weekly] == true &&
          params[:calendar][:repeat][:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.weekly.day(@days)
      elsif params[:calendar][:repeat][:repeat_weekly] == true &&
          !params[:calendar][:repeat][:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.weekly(params[:calendar][:repeat][:repeat_count]).day(@days)
      end

      if params[:repeat_monthly] == true
        @start_schedule.add_recurrence_rule Rule.monthly
      end

      if params[:repeat_yearly] == true
        @start_schedule.add_recurrence_rule Rule.yearly
      end

      if params[:calendar][:repeat][:number_of_repeats]
        rule.count(params[:calendar][:repeat][:number_of_repeats])
      end
      if params[:calendar][:repeat][:repeat_until]
        rule.until(params[:calendar][:repeat][:repeat_until])
      end



      return @start_schedule.to_yaml
    end
  end




  def SchedulerTool.list_of_instances(object, start_date, end_date)
    @instances = Array.new
    if object.class == Organization
      object.opportunities.each do |opp|
        SchedulerTool.object_loop(opp, start_date, end_date)
      end
    else
      SchedulerTool.object_loop(object, start_date, end_date)
    end
    return @instances
  end





  private

  def SchedulerTool.object_loop(object, start_date, end_date)

    object.object_schedules.each do |s|

      schedule = IceCube::Schedule.from_yaml(s.schedule)
      # duration = ((s.end_time.to_i - schedule.first.strftime('%Q').to_i) / 36000000).round

      schedule.occurrences_between(Time.at(start_date.to_i), Time.at(end_date.to_i)).each do |occ|
        instance = object.class.new
        instance.name = object.name
        instance.id = object.id
        instance.color = object.color
        instance.start_time = occ.start_time
        # instance.end_time = occ + duration
        @instances.push(instance)
      end
    end
  end
end
