class AddTypeToOrganizationMailingServices < ActiveRecord::Migration
  def change
    add_column :organization_mailing_services, :type, :string
  end
end
