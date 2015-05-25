module ScheduleFromParams
  include IceCube

  def ScheduleFromParams.schedule_from_params(params)
    if params[:repeating_event] === true
      @start_schedule = Schedule.new( Time.at(params[:start_time].to_i / 1000 ) )
      puts @start_schedule
      if params[:daily] == true && params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.daily
      elsif params[:daily] == true && !params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.daily(params[:repeat_count])
      end
      if params[:weekly] == true && params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.weekly.day(params[:repeat_days])
      elsif params[:weekly] == true && !params[:repeat_count].blank?
        @start_schedule.add_recurrence_rule Rule.weekly(params[:repeat_count]).day(params[:repeat_days])
      end
      if params[:monthly] == true
        @start_schedule.add_recurrence_rule Rule.monthly
      end
      if params[:yearly] == true
        @start_schedule.add_recurrence_rule Rule.yearly
      end
      puts @start_schedule.to_yaml
      return @start_schedule.to_yaml
    end
  end

end