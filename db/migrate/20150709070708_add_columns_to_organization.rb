class AddColumnsToOrganization < ActiveRecord::Migration
  def change
    add_column :organizations, :address, :string
    add_column :organizations, :city, :string
    add_column :organizations, :state, :string
    add_column :organizations, :zip_code, :string
  end
end
