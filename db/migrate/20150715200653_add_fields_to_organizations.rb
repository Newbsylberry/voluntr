class AddFieldsToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :custom_url, :string
    add_column :organizations, :website_url, :text
    add_column :organizations, :facebook_url, :text
    add_column :organizations, :twitter_url, :text
  end
end
