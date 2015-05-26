class AddScheduleToSchedules < ActiveRecord::Migration
  def change
    add_column :schedules, :schedule, :text

    create_table :object_schedules do |t|
      t.integer :scheduleable_id
      t.string :scheduleable_type
      t.string :end_time

      t.timestamps null: false
    end

    add_index :schedules, :scheduleable_id
  end
end
