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
        @organization_posts_imported += 1
        if @organization_response_length == 0 and @organization_posts.next_page
          @organization_posts = @organization_posts.next_page
          @organization_response_length = @organization_posts.count
        end
      end
    end
  end
end