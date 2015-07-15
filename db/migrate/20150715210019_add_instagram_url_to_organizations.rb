class AddInstagramUrlToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :instagram_url, :text
  end
end
