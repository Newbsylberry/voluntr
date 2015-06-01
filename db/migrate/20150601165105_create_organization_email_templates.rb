class CreateOrganizationEmailTemplates < ActiveRecord::Migration
  def change
    create_table :organization_email_templates do |t|
      t.integer :organization_email_type_id
      t.string :name
      t.string :description
      t.text :introduction_text
      t.integer :marketing_materials
      t.integer :upcoming_events
      t.integer :upcoming_events_period

      t.timestamps null: false
    end
  end
end
