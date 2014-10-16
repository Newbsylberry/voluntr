class RemoveAboutFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :about, :string
  end
end
