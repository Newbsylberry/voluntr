class CreateOrganizationEmailTypes < ActiveRecord::Migration
  def change
    create_table :organization_email_types do |t|
      t.string :name
      t.string :description

      t.timestamps null: false
    end
  end
end
