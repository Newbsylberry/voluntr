class RemoveLongLatFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :latitude_longitude, :string
  end
end
