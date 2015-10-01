class AddNotesToOrganizationPerson < ActiveRecord::Migration
  def change
    add_column :organization_people, :notes, :text
  end
end
