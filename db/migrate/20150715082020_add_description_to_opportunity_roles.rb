class AddDescriptionToOpportunityRoles < ActiveRecord::Migration
  def change
    add_column :opportunity_roles, :description, :text
  end
end
