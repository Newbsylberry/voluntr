class AddVolunteersNeededToOpportunityRoles < ActiveRecord::Migration
  def change
    add_column :opportunity_roles, :volunteers_required, :integer
  end
end
