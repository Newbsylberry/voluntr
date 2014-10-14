class AddFbidToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :fb_id, :integer, limit: 8
  end
end
