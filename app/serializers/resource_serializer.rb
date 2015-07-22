class ResourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :resourceable_id, :resourceable_type, :resource
end
