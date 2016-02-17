class CreateOrganizationOpportunities < ActiveRecord::Migration
  def change
    create_table :organization_opportunities do |t|
      t.integer :opportunity_id
      t.integer :organization_id
      t.boolean :administrator

      t.timestamps null: false
    end
  end
end
