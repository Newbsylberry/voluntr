class DropColumnsFromOpportunities < ActiveRecord::Migration
  def change
    remove_column :opportunities, :start_date
    remove_column :opportunities, :end_date

    add_column :opportunities, :start_time, :string
    add_column :opportunities, :end_time, :string
  end
end
