class RemoveIntegerFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :integer, :string
  end
end
