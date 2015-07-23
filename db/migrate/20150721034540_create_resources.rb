class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :name
      t.string :description
      t.integer :resourceable_id
      t.string :resourceable_type

      t.timestamps null: false
    end
    add_index :resources, :resourceable_id
  end
end
