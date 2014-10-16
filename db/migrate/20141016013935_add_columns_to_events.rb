class AddColumnsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :name, :string
    add_column :events, :location, :string
    add_column :events, :start_date, :datetime
    add_column :events, :end_date, :datetime
    add_column :events, :about, :string
    add_column :events, :timezone, :string
  end
end
