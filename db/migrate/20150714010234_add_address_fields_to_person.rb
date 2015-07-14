class AddAddressFieldsToPerson < ActiveRecord::Migration
  def change
    remove_column :people, :address
    add_column :people, :address_1, :string
    add_column :people, :address_2, :string
  end
end
