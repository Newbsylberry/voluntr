class CreatePersonOpportunities < ActiveRecord::Migration
  def change
    create_table :person_opportunities do |t|
      t.integer :person_id
      t.integer :opportunity_id

      t.timestamps
    end

    drop_table :organization_person_opportunities
  end
end
