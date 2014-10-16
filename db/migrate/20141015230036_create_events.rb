class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :fb_id, :integer, limit: 8

      t.timestamps
    end
  end
end
