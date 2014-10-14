class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.integer :fb_id

      t.timestamps
    end
  end
end
