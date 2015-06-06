class AddPermissionToRecordedHours < ActiveRecord::Migration
  def change
    add_column :recorded_hours, :photo_consent, :boolean
  end
end
