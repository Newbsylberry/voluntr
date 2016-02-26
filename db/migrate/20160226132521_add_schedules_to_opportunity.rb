class AddSchedulesToOpportunity < ActiveRecord::Migration
  def change
    add_column :opportunities, :schedules, :json
  end
end
