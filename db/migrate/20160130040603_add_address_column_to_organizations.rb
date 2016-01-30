class AddAddressColumnToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :address_2, :string
    rename_column :organizations, :address, :address_1
  end
end
