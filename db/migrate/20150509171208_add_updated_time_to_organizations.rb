class AddUpdatedTimeToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :last_social_update, :datetime
  end
end
