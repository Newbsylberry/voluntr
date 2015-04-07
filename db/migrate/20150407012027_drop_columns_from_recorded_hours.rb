class DropColumnsFromRecordedHours < ActiveRecord::Migration
  def change
    remove_column :daily_statistics, :possible_recorded_hours

    add_column :daily_statistics, :planned_hours, :integer
  end
end
