class AddScheduleDetailToSchedules < ActiveRecord::Migration
  def change
    add_column :schedules, :schedule_detail, :text
  end
end
