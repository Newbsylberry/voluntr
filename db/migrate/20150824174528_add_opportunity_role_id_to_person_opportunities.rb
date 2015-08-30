class AddOpportunityRoleIdToPersonOpportunities < ActiveRecord::Migration
  def change
    add_column :person_opportunities, :opportunity_role_id, :integer
  end
end
