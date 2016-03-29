class CreateResourceTypes < ActiveRecord::Migration
  def change
    create_table :resource_types do |t|
      t.string :name
      t.string :description

      t.timestamps null: false
    end

    ResourceType.create!(
        name: 'For Volunteers',
        description: 'These resources are for volunteers and are sent to volunteers when appropriate.'
    )

    ResourceType.create!(
        name: 'Internal Use',
        description: 'These resources are only for use by the organization and its collaborators.'
    )

    ResourceType.create!(
        name: 'Report',
        description: 'These resources provide information to organizations.'
    )
  end
end
