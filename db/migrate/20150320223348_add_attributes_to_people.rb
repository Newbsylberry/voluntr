class AddAttributesToPeople < ActiveRecord::Migration
  def change
    add_column :people, :zip_code, :string
    add_column :people, :state, :string
    add_column :people, :city, :string
    add_column :people, :phone, :string
    add_column :people, :email, :string
    add_column :people, :address, :string
  end
end
