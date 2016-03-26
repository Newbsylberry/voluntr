class AddInstancesToRecordedHours < ActiveRecord::Migration
  def change
    add_column :recorded_hours, :instances, :json
    execute "ALTER TABLE recorded_hours ALTER COLUMN instances SET DEFAULT '[]'::JSON"
  end
end
