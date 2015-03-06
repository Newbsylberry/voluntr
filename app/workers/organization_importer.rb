class OrganizationImporter
  @queue = :facebook_queue

  def self.perform(organization_id, oauth_access, account)
    @graph = Koala::Facebook::API.new(oauth_access.to_s)
    @organization_posts = @graph.get_connections(account.to_s, "posts")
    @organization_response_length = @organization_posts.count
    @organization_posts_imported = 0
    until @organization_response_length == 0 and !@organization_posts.next_page
      @organization_posts.each do |p|
        @organization_response_length -= 1
        @post = Post.new
        @post.message = p['message']
        @post.fb_id = p['id']
        @post.organization_id = organization_id
        @post.post_time = p['created_time']
        if ! (p["likes"].nil? || p["likes"].empty?)
          @post.likes = p['likes']['data'].count
        else
          @post.likes = 0
        end
        @post.save
        if @organization_response_length == 0 and @organization_posts.next_page
          @organization_posts = @organization_posts.next_page
          @organization_response_length = @organization_posts.count
        end
      end
    end
  end
end