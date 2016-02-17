class AddCollaborativeColumnToOpportunities < ActiveRecord::Migration
  def change
    add_column :opportunities, :collaborative, :boolean
  end
end
