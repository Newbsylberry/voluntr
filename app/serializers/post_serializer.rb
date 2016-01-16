class PostSerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :post_time, :likes
end