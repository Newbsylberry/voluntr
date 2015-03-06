class CreateOrganizationPeople < ActiveRecord::Migration
  def change
    create_table :organization_people do |t|
      t.integer :person_id
      t.integer :organization_id

      t.timestamps
    end
  end
end
