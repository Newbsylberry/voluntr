class CreateOpportunityInstances < ActiveRecord::Migration
  def change
    create_table :opportunity_instances do |t|
      t.integer :opportunity_id
      t.datetime :instance_date

      t.timestamps null: false
    end
  end
end
