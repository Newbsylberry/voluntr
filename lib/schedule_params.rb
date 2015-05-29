module SchedulerTool
  include IceCube

  def SchedulerTool.schedule_from_params(params, object)


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

      if params[:calendar][:repeating_event] === true && params[:calendar][:repeat][:repeat_daily]
        SchedulerTool.rule_creation(@start_schedule, params[:calendar][:repeat], 'daily')
      elsif params[:calendar][:repeating_event] === true && params[:calendar][:repeat][:repeat_weekly] == true
        SchedulerTool.rule_creation(@start_schedule, params[:calendar][:repeat], 'weekly')
      elsif params[:calendar][:repeating_event] === true && params[:calendar][:repeat][:repeat_monthly] == true
        SchedulerTool.rule_creation(@start_schedule, params[:calendar][:repeat], 'monthly')
      elsif params[:calendar][:repeating_event] === true && params[:calendar][:repeat][:repeat_annually] == true
        SchedulerTool.rule_creation(@start_schedule, params[:calendar][:repeat], 'annually')
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





  def SchedulerTool.rule_creation(schedule, repeat_params, repeat_type)
    interval = repeat_params[:repeat_count]
    repeat_repititions = repeat_params[:number_of_repeats]
    repeat_stop_date = repeat_params[:repeat_until]


    # DAILY REPEAT RULES
    if repeat_type == 'daily'
      if !interval.blank?
        if repeat_repititions.blank? && repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.daily(interval)
        elsif !repeat_repititions.blank? && repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.daily(interval).count(repeat_repititions)
        elsif repeat_repititions.blank? && !repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.daily(interval).until(Time.at(repeat_stop_date.to_i / 1000))
        elsif !repeat_repititions.blank? && !repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.daily(interval).until(Time.at(repeat_stop_date.to_i / 1000))
                                           .count(repeat_repititions)
        end
      else interval.blank?
      if repeat_repititions.blank? && repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.daily(1)
      elsif !repeat_repititions.blank? && repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.daily.repeat_type.count(repeat_repititions)
      elsif repeat_repititions.blank? && !repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.daily.repeat_type.until(Time.at(repeat_stop_date.to_i / 1000))
      elsif !repeat_repititions.blank? && !repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.daily.repeat_type.until(Time.at(repeat_stop_date.to_i / 1000))
                                         .count(repeat_repititions)
      end
      end

      # WEEKLY REPEAT RULES
    elsif repeat_type == 'weekly'
      @days = Array.new
      if repeat_params[:monday_repeat] == true
        @days.push(1)
      end
      if repeat_params[:tuesday_repeat] == true
        @days.push(2)
      end
      if repeat_params[:wednesday_repeat] == true
        @days.push(3)
      end
      if repeat_params[:thursday_repeat] == true
        @days.push(4)
      end
      if repeat_params[:friday_repeat] == true
        @days.push(5)
      end
      if repeat_params[:saturday_repeat] == true
        @days.push(6)
      end
      if repeat_params[:sunday_repeat] == true
        @days.push(7)
      end
      if !interval.blank?
        if !@days.empty?
          if repeat_repititions.blank? && repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval).day(@days)
          elsif !repeat_repititions.blank? && repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval).count(repeat_repititions).day(@days)
          elsif repeat_repititions.blank? && !repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval).until(Time.at(repeat_stop_date.to_i / 1000)).day(@days)
          elsif !repeat_repititions.blank? && !repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval).until(Time.at(repeat_stop_date.to_i / 1000))
                                             .count(repeat_repititions).day(@days)
          end
        elsif @days.empty?
          if repeat_repititions.blank? && repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval)
          elsif !repeat_repititions.blank? && repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval).count(repeat_repititions)
          elsif repeat_repititions.blank? && !repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval).until(Time.at(repeat_stop_date.to_i / 1000))
          elsif !repeat_repititions.blank? && !repeat_stop_date.blank?
            schedule.add_recurrence_rule Rule.weekly(interval).until(Time.at(repeat_stop_date.to_i / 1000))
                                             .count(repeat_repititions)
          end
        end
      else interval.blank?
      if !@days.empty?
        if repeat_repititions.blank? && repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.weekly(1).day(@days)
        elsif !repeat_repititions.blank? && repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.daily.repeat_type.count(repeat_repititions).day(@days)
        elsif repeat_repititions.blank? && !repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.daily.repeat_type.until(Time.at(repeat_stop_date.to_i / 1000)).day(@days)
        elsif !repeat_repititions.blank? && !repeat_stop_date.blank?
          schedule.add_recurrence_rule Rule.daily.repeat_type.until(Time.at(repeat_stop_date.to_i / 1000))
                                           .count(repeat_repititions).day(@days)
        end
      else @days.empty?
      if repeat_repititions.blank? && repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.weekly(1)
      elsif !repeat_repititions.blank? && repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.daily.repeat_type.count(repeat_repititions)
      elsif repeat_repititions.blank? && !repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.daily.repeat_type.until(Time.at(repeat_stop_date.to_i / 1000))
      elsif !repeat_repititions.blank? && !repeat_stop_date.blank?
        schedule.add_recurrence_rule Rule.daily.repeat_type.until(Time.at(repeat_stop_date.to_i / 1000))
                                         .count(repeat_repititions)
      end

      end

      end




      # MONTHLY REPEAT RULES
    elsif repeat_type == 'monthly'



      # ANNUAL REPEAT RULES


    end


    return schedule
  end
end
