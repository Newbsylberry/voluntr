class AddResourceTypeIdtoResources < ActiveRecord::Migration
  def change
    add_column :resources, :resource_type_id, :integer
  end
end
