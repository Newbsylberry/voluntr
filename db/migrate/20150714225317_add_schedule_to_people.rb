class AddScheduleToPeople < ActiveRecord::Migration
  def change
    enable_extension "hstore"
    add_column :people, :schedule, :hstore
  end
end
