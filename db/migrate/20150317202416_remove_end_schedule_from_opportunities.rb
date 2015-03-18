class RemoveEndScheduleFromOpportunities < ActiveRecord::Migration
  def change
    remove_column :opportunities, :end_schedule, :text
  end
end
