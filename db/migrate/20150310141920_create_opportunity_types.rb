class CreateOpportunityTypes < ActiveRecord::Migration
  def change
    create_table :opportunity_types do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
