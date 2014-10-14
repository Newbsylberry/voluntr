class RemoveFbFromOrganizations < ActiveRecord::Migration
  def change
    remove_column :organizations, :fb_id, :string
  end
end
