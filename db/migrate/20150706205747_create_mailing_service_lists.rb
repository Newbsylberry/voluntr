class CreateMailingServiceLists < ActiveRecord::Migration
  def change
    create_table :mailing_service_lists do |t|
      t.integer :organization_mailing_service_id
      t.string :name
      t.integer :current_subscribers

      t.timestamps null: false
    end
  end
end
