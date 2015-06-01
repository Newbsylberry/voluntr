class AddOrganizationIdColumnToOrganizationEmailTemplates < ActiveRecord::Migration
  def change
    add_column :organization_email_templates, :organization_id, :integer
  end
end
