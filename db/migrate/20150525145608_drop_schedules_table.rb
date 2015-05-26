class DropSchedulesTable < ActiveRecord::Migration
  def change

    drop_table :schedules

    create_table :object_schedules do |t|
      t.integer :scheduleable_id
      t.string :scheduleable_type
      t.string :end_time

      t.timestamps null: false
    end

    add_column :object_schedules, :schedule, :text

    add_index :object_schedules, :scheduleable_id

  end
end
