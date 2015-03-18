class AddColorToOpportunities < ActiveRecord::Migration
  def change
    add_column :opportunities, :color, :string
  end
end
