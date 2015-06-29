class OrganizationPerson < ActiveRecord::Base
  belongs_to :organization
  belongs_to :person

  validates :person_id, uniqueness: { scope: :organization_id }
end
