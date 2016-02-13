class ResourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :resourceable_id, :resourceable_type, :resource,:resourceable_file, :resourceable_uploaded
end
