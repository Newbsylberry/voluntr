class AddResourceColumnToResources < ActiveRecord::Migration
  def change
    add_column :resources, :resource, :string
  end
end
