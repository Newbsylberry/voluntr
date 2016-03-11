class AddCustomFieldsToOrganizationPerson < ActiveRecord::Migration
  def change
    add_column :organization_people, :custom_fields, :json
  end
end
