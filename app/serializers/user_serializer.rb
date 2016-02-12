class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_entered?, :profile
end
