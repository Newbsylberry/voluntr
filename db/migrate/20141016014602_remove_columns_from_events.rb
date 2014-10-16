class RemoveColumnsFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :start_date, :string
    remove_column :events, :end_date, :string
  end
end
