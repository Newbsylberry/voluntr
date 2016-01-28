class OrganizationWorker < ActiveJob::Base
  queue_as :low_priority

  def perform(organization_id, oauth_access, account)
    @organization = Organization.find(organization_id)
    @graph = Koala::Facebook::API.new(oauth_access.to_s)
    @organization_posts = @graph.get_connections(account.to_s, "posts")
    @organization_response_length = @organization_posts.count
    @organization_posts_imported = 0
    until @organization_response_length == 0 and !@organization_posts.next_page
      @organization_posts.each do |p|
        @organization_response_length -= 1
        @post = Post.create_with(locked: false)
                    .find_or_initialize_by(fb_id: p['id'])
        @post.message = p['message']
        @post.fb_id = p['id']
        @post.organization = Organization.find(organization_id)
        @post.post_time = p['created_time']
        if !(p["likes"].nil? || p["likes"].empty?)
          @post.likes = p['likes']['data'].count
          @graph.get_connections(p['id'].to_s, "likes").each do |l|
            if (!Person.find_by_fb_id(l["id"]))
              @person = Person.new
              @person.fb_id = l["id"]
              @person.first_name = l["name"].split(" ")[0]
              @person.last_name =  l["name"].split(" ")[1]
              @person.save
              @person.add_to_organization(Organization.find(organization_id), '')
            else @person = Person.find_by_fb_id(l["id"])
            if (!OrganizationPerson.find_by_person_id_and_organization_id(@person.id, organization_id))
              @person.add_to_organization(Organization.find(organization_id), '')
            end
            end
          end
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
    @organization.last_social_update = Time.now
    @organization.save
  end
end