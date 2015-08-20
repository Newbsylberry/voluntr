class Group < ActiveRecord::Base
  has_many :recorded_hours
  has_many :people, through: :group_administrators

  # def create_with_administrators(organization, group_params, people_params)
  #
  # end
end

