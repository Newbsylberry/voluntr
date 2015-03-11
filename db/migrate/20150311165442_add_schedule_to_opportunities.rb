class AddScheduleToOpportunities < ActiveRecord::Migration
  def change
    add_column :opportunities, :start_schedule, :text
    add_column :opportunities, :end_schedule, :text
  end
end
