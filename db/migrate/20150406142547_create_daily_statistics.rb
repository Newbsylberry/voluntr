class CreateDailyStatistics < ActiveRecord::Migration
  def change
    create_table :daily_statistics do |t|
      t.integer :organization_id
      t.integer :total_recorded_hours
      t.integer :total_added_volunteers
      t.integer :possible_recorded_hours

      t.timestamps
    end
  end
end
