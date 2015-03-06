class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :fb_id
      t.text :message
      t.string :organization_id
      t.timestamp :post_time

      t.timestamps
    end
  end
end
