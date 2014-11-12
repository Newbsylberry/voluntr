class AddUserIdToUserEventHours < ActiveRecord::Migration
  def change
    add_column :user_event_hours, :user_id, :integer
  end
end
