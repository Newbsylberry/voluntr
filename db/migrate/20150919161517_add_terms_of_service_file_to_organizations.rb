class AddTermsOfServiceFileToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :terms_of_service_file, :string
  end
end
