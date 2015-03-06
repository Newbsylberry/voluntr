class AddLikesToPost < ActiveRecord::Migration
  def change
    add_column :posts, :likes, :string
  end
end
