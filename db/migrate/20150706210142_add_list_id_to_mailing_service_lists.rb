class AddListIdToMailingServiceLists < ActiveRecord::Migration
  def change
    add_column :mailing_service_lists, :list_id, :string
  end
end
