class RemoveObjectSchedules < ActiveRecord::Migration
  def change
    drop_table :object_schedules
  end
end
