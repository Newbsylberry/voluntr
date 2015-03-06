class AddDescriptionsToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :name, :string
    add_column :organizations, :description, :text
  end
end
