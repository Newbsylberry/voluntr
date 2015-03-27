class PersonOpportunitiesController < ApplicationController
  include IceCube
  respond_to :json


  def create
    @person_opportunity = PersonOpportunity.new(person_opportunity_params)

    schedule = Schedule.new(Time.at(params[:start_time].to_i / 1000))

    if params[:daily] == true && params[:repeat_count].blank?
      schedule.add_recurrence_rule Rule.daily
    elsif params[:daily] && !params[:repeat_count].blank?
      schedule.add_recurrence_rule Rule.daily(params[:repeat_count])
    end
    if params[:weekly] == true && params[:repeat_count].blank?
      schedule.add_recurrence_rule Rule.weekly.day(params[:repeat_days])
    elsif params[:weekly] && !params[:repeat_count].blank?
      schedule.add_recurrence_rule Rule.weekly(params[:repeat_count]).day(params[:repeat_days])
    end
    if params[:monthly] == true
      schedule.add_recurrence_rule Rule.monthly
    end
    if params[:yearly] == true
      schedule.add_recurrence_rule Rule.yearly
    end
    @person_opportunity.schedule = schedule.to_yaml


    @person_opportunity.save

    respond_with @person_opportunity
  end




  private

  def person_opportunity_params
    params.require(:person_opportunity).permit(:person_id, :opportunity_id, :schedule)
  end

end


