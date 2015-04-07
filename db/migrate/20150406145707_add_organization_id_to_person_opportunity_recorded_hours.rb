class AddOrganizationIdToPersonOpportunityRecordedHours < ActiveRecord::Migration
  def change
    add_column :person_opportunity_recorded_hours, :organization_id, :integer
  end
end
