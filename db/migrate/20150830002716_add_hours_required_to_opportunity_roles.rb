class AddHoursRequiredToOpportunityRoles < ActiveRecord::Migration
  def change
    add_column :opportunity_roles, :hours_required, :integer
  end
end
