class AddAdditionalInformationToPerson < ActiveRecord::Migration
  def change
    add_column :people, :organization_name, :string
    add_column :people, :occupation, :string
  end
end
