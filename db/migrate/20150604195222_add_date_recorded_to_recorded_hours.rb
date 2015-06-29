class AddDateRecordedToRecordedHours < ActiveRecord::Migration
  def change
    add_column :recorded_hours, :date_recorded, :datetime
  end
end
