class DropInstancesFromRecordedHours < ActiveRecord::Migration
  def change
    remove_column :recorded_hours, :instances
    add_column :recorded_hours, :instance, :datetime
  end
end
