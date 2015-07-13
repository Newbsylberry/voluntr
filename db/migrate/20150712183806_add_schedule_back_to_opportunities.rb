class AddScheduleBackToOpportunities < ActiveRecord::Migration

  def change
    add_column :opportunities, :schedule, :text
  end
end
