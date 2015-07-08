class AddDefaultListToOrganizationMailingServices < ActiveRecord::Migration
  def change
    add_column :organization_mailing_services, :default_list_id, :integer
  end
end
