class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :first_name, :last_name, :total_hours, :name


  def name
    first_name + " " + last_name
  end
end
