class AddContactMeToRecordedHours < ActiveRecord::Migration
  def change
    add_column :recorded_hours, :contact_me, :boolean
  end
end
