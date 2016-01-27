class AddOrganizationTypeIdToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :organization_type_id, :integer
  end
end
