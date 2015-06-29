class CreateOpportunityRoles < ActiveRecord::Migration
  def change
    create_table :opportunity_roles do |t|
      t.integer :opportunity_id
      t.string :name

      t.timestamps null: false
    end
  end
end
