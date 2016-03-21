class AddAddress2ToOpportunities < ActiveRecord::Migration
  def change
    rename_column :opportunities, :address, :address_1
    add_column :opportunities, :address_2, :string
  end
end
