class OrganizationPerson < ActiveRecord::Base
  belongs_to :organization
  belongs_to :person
end
