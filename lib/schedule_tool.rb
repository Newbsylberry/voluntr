module SchedulerTool
  include IceCube

  def SchedulerTool.schedule_from_params(params, object)
    start_time = Time.at(params[:start_time].to_i / 1000)
    end_time = Time.at(params[:end_time].to_i / 1000)


    if !object.schedule.nil?
      schedule = IceCube::Schedule.from_yaml(object.schedule)
      @hash = schedule.to_hash
      if @hash[:start_date] < Time.now
        # @hash[:start_date] = start_time
        # @hash[:end_time] = end_time

        if schedule.recurrence_rules
          @hash[:rrules].each do |rr|
            if rr[:until].nil?
              rr[:until] = start_time
            end
          end
          schedule = IceCube::Schedule.from_hash(@hash)
        end
      end
    end


    if !schedule || @hash[:start_date] > Time.now
      schedule = Schedule.new(start_time)
      if params[:end_time]
        schedule.end_time = Time.at(params[:end_time].to_i / 1000)
      end
    end

    if params[:repeat].class == String
      params[:repeat] = JSON.parse(params[:repeat])
      if params[:repeating_event] === "true"
        params[:repeating_event] = true
      end
    end

    if params[:repeating_event] === true && params[:repeat][:repeat_type] == 'repeat_daily'
      SchedulerTool.rule_creation(schedule, params[:repeat], 'daily')
    elsif params[:repeating_event] === true && params[:repeat][:repeat_type] == 'repeat_weekly'
      SchedulerTool.rule_creation(schedule, params[:repeat], 'weekly')
    elsif params[:repeating_event] === true && params[:repeat][:repeat_type] == 'repeat_monthly'
      SchedulerTool.rule_creation(schedule, params[:repeat], 'monthly')
    elsif params[:repeating_event] === true && params[:repeat][:repeat_type] == 'repeat_annually'
      SchedulerTool.rule_creation(schedule, params[:repeat], 'annually')
    end

    return schedule.to_yaml
  end





# When a user wants to see the number of instances in a schedule
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

  def SchedulerTool.hash_array_loop(schedule_hash, array)
    days = array
    schedule_hash.each do |key, value|
      if key.to_s == "monday" && value == true
        days << 1
      elsif key.to_s == "tuesday" && value == true
        days << 2
      elsif key.to_s== "wednesday" && value == true
        days << 3
      elsif key.to_s== "thursday" && value == true
        days << 4
      elsif key.to_s == "friday" && value == true
        days << 5
      elsif key.to_s == "saturday" && value == true
        days << 6
      elsif key.to_s == "sunday" && value == true
        days << 0
      end
    end
    return days
  end





  private

  def SchedulerTool.object_loop(opportunity, start_date, end_date)

    if opportunity.schedule
      schedule = IceCube::Schedule.from_yaml(opportunity.schedule)


      schedule.occurrences_between(DateTime.parse(start_date.to_s), DateTime.parse(end_date.to_s)).each do |occ|


        instance = OpportunityInstance.new
        instance.opportunity = opportunity
        instance.id = opportunity.id
        instance.instance_date = occ.start_time
        instance.color = opportunity.color
        instance.start = occ.start_time
        instance.end = occ.end_time
        instance.created_at = Time.now
        instance.updated_at = Time.now



        # instance.end_time = occ + duration
        @instances.push(instance)
      end
    end
  end







  def SchedulerTool.rule_creation(schedule, repeat_params, repeat_type)
    interval = repeat_params[:repeat_count]
    if repeat_params[:number_of_occurrences]
      repeat_repititions = repeat_params[:number_of_occurrences]
    end
    if repeat_params[:repeat_until]
      repeat_stop_date = Time.parse(repeat_params[:repeat_until])
    end
    @rule = Hash.new
    @rule["validations"] = Hash.new
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

    if repeat_type == 'daily'
      @rule["rule_type"] = "IceCube::DailyRule"
    elsif repeat_type == 'weekly'
      @rule["rule_type"] = "IceCube::WeeklyRule"
    elsif repeat_type == 'monthly'
      @rule["rule_type"] = "IceCube::MonthlyRule"
      if repeat_params["monthly_repeat"] && repeat_params["monthly_repeat"]["type"] == "day_of_week"
        @rule["validations"]["day_of_week"] = Hash.new
        repeat_params["monthly_repeat"].each do |k,v|
          if k == "sunday_repeat" and !v.empty?
            @rule["validations"]["day_of_week"]["0"] = Array.new
            SchedulerTool.monthly_daily_rule(@rule["validations"]["day_of_week"]["0"], v)
          elsif k == "monday_repeat" and !v.empty?
            @rule["validations"]["day_of_week"]["1"] = Array.new
            SchedulerTool.monthly_daily_rule(@rule["validations"]["day_of_week"]["1"], v)
          elsif k == "tuesday_repeat" and !v.empty?
            @rule["validations"]["day_of_week"]["2"] = Array.new
            SchedulerTool.monthly_daily_rule(@rule["validations"]["day_of_week"]["2"], v)
          elsif k == "wednesday_repeat" and !v.empty?
            @rule["validations"]["day_of_week"]["3"] = Array.new
            SchedulerTool.monthly_daily_rule(@rule["validations"]["day_of_week"]["3"], v)
          elsif k == "thursday_repeat" and !v.empty?
            @rule["validations"]["day_of_week"]["4"] = Array.new
            SchedulerTool.monthly_daily_rule(@rule["validations"]["day_of_week"]["4"], v)
          elsif k == "friday_repeat" and !v.empty?
            @rule["validations"]["day_of_week"]["5"] = Array.new
            SchedulerTool.monthly_daily_rule(@rule["validations"]["day_of_week"]["5"], v)
          elsif k == "saturday_repeat" and !v.empty?
            @rule["validations"]["day_of_week"]["6"] = Array.new
            SchedulerTool.monthly_daily_rule(@rule["validations"]["day_of_week"]["6"], v)
          end
        end
      end
    elsif repeat_type == 'annually'
      @rule["rule_type"] = "IceCube::YearlyRule"
    end
    @rule["interval"] = interval

    @rule["validations"]["count"] = repeat_repititions.to_i unless repeat_repititions.to_i == 0 || repeat_repititions.nil?
    @rule["validations"]["until"] = repeat_stop_date
    @rule["validations"]["day"] = @days
    schedule.add_recurrence_rule Rule.from_hash(@rule)

    return schedule
  end

  def SchedulerTool.monthly_daily_rule(array, params)
    params.each do |k,v|
      if k == "first_week" and v == true
        array.push(1)
      elsif k == "second_week" and v == true
        array.push(2)
      elsif k == "third_week" and v == true
        array.push(3)
      elsif k == "fourth_week" and v == true
        array.push(4)
      end
    end

    return array
  end

end
