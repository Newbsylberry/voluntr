class AddDesiredNumberOfVolunteersToOpportunities < ActiveRecord::Migration
  def change
    add_column :opportunities, :volunteer_goal, :integer
  end
end
