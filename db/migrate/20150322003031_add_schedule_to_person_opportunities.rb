class AddScheduleToPersonOpportunities < ActiveRecord::Migration
  def change
    add_column :person_opportunities, :schedule, :text
  end
end
