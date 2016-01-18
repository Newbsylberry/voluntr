class PostSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :message, :post_time, :likes
end