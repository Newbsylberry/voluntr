class AddAddressToOpportunities < ActiveRecord::Migration
  def change
    add_column :opportunities, :address, :string
  end
end
