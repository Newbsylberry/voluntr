class AddOpportunityRoleIdToRecordedHours < ActiveRecord::Migration
  def change
    add_column :recorded_hours, :opportunity_role_id, :integer
  end
end
