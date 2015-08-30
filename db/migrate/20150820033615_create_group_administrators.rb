class CreateGroupAdministrators < ActiveRecord::Migration
  def change
    create_table :group_administrators do |t|
      t.integer :person_id
      t.integer :group_id

      t.timestamps null: false
    end
  end
end
