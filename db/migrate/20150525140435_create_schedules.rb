class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.integer :scheduleable_id
      t.string :scheduleable_type
      t.string :end_time

      t.timestamps null: false
    end

    add_index :schedules, :scheduleable_id
  end
end
