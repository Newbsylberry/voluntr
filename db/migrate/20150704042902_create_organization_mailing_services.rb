class CreateOrganizationMailingServices < ActiveRecord::Migration
  def change
    create_table :organization_mailing_services do |t|
      t.integer :organization_id
      t.text :token

      t.timestamps null: false
    end
  end
end
