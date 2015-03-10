class DropEventsTable < ActiveRecord::Migration
  def change

    drop_table :events


    create_table :opportunities do |t|
      t.integer :fb_id, :string
      

      t.timestamps
    end

    add_column :opportunities, :name, :string
    add_column :opportunities, :opportunity_type_id, :integer
    add_column :opportunities, :location, :string
    add_column :opportunities, :start_date, :string
    add_column :opportunities, :end_date, :string
    add_column :opportunities, :description, :text
    add_column :opportunities, :timezone, :string
    add_column :opportunities, :latitude, :float
    add_column :opportunities, :longitude, :float
    add_column :opportunities, :organization_id, :integer
  
  
  end
end
