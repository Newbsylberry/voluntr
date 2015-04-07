class RemovePersonOpportunityRecordedHours < ActiveRecord::Migration
  def change
    drop_table :person_opportunity_recorded_hours

    create_table :recorded_hours do |t|
      t.integer :person_id
      t.integer :opportunity_id
      t.integer :organization_id
      t.integer :hours

      t.timestamps
    end

  end
end
