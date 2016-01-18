class ChangePostsOrgIdToInt < ActiveRecord::Migration
  def up
    remove_column :posts, :organization_id
    add_column :posts, :organization_id, :integer
    remove_column :posts, :likes
    add_column :posts, :likes, :integer
  end

  def down
    remove_column :posts, :organization_id
    add_column :posts, :organization_id, :string
    remove_column :posts, :likes
    add_column :posts, :likes, :string
  end
end
