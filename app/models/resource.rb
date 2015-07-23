class Resource < ActiveRecord::Base
  mount_uploader :resource, ResourceUploader
  belongs_to :resourceable, polymorphic: true
end
