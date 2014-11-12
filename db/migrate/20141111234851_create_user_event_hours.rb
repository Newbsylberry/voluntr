class CreateUserEventHours < ActiveRecord::Migration
  def change
    create_table :user_event_hours do |t|
      t.integer :event_id
      t.integer :hours
      t.string :description

      t.timestamps
    end
  end
end
