class CreatePersonOpportunityRecordedHours < ActiveRecord::Migration
  def change
    create_table :person_opportunity_recorded_hours do |t|
      t.integer :person_id
      t.integer :opportunity_id
      t.integer :hours

      t.timestamps
    end
  end
end
