class AddDescriptionToRecordedHours < ActiveRecord::Migration
  def change
    add_column :recorded_hours, :description, :text
  end
end
