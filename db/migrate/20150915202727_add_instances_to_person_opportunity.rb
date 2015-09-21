class AddInstancesToPersonOpportunity < ActiveRecord::Migration
  def change
    add_column :person_opportunities, :instances, :json
    execute "ALTER TABLE person_opportunities ALTER COLUMN instances SET DEFAULT '[]'::JSON"
  end
end
