class AddConclusionTextToOrganizationEmailTemplates < ActiveRecord::Migration
  def change
    add_column :organization_email_templates, :conclusion_text, :text
  end
end
