class OrganizationOpportunity < ActiveRecord::Base
  belongs_to :organization
  belongs_to :opportunity
end
