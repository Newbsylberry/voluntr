class AddOutdatedColumnToObjectSchedules < ActiveRecord::Migration
  def change
    add_column :object_schedules, :outdated, :boolean
  end
end
