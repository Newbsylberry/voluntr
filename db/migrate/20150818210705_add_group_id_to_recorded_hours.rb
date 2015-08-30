class AddGroupIdToRecordedHours < ActiveRecord::Migration
  def change
    add_column :recorded_hours, :group_id, :integer
  end
end
