class SchedulesController < ApplicationController
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")

  def schedule_string
    ap IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(params, Opportunity.new)).to_s
    render json: {schedule: IceCube::Schedule.from_yaml(SchedulerTool.schedule_from_params(params, Opportunity.new)).to_s}
  end
end
