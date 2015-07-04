class RemoveTypeFromOrganizationMailingService < ActiveRecord::Migration
  def change
    remove_column :organization_mailing_services, :type

    add_column :organization_mailing_services, :service_type, :string
  end
end
