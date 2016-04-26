class OrganizationPerson < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  belongs_to :organization
  belongs_to :person

  validates :person_id, uniqueness: { scope: :organization_id }

  def subscribed_to_list?(list_id)
    ap list_id
    hash = Digest::MD5.hexdigest(person.email.downcase)
    if Mailchimp.api(organization.organization_mailing_services
                         .find_by_service_type('mail_chimp').token).
        get("lists/#{list_id}/members/#{hash}").response.status < 400
      return true
    else
      return false
    end
  end




  def add_to_lists(lists)
    if self.person.email &&
        !lists.nil?
      member = Hash.new
      member["status"] = "subscribed"
      member["email_address"] = person.email
      member["status"] = "subscribed"
      member["merge_fields"] = Hash.new;
      member["merge_fields"]["FNAME"] = person.first_name
      member["merge_fields"]["LNAME"] = person.last_name
      added_lists = Array.new
      lists.each do |list|
          if !list.nil? && !self.subscribed_to_list?(list.list_id)
            response = Mailchimp.api(organization.organization_mailing_services
                              .find_by_service_type('mail_chimp').token).
                post("lists/#{list.list_id}/members/", {body: member.to_json})
            added_lists << list
          end
      end
      return added_lists
    end
  end

  def send_registration_confirmation
    if self.person.email
      PersonOrganizationMailer.registration_confirmation_email(organization, person).deliver
    end
  end


  def as_indexed_json(options={})
    as_json(
        # only: [:id, :first_name, :email],
        include: [:person]
    )
  end

  def resources
    resources = []
    person.resources.each do |r|
      ap r
      if r.organization_id == organization.id
        resources << r
      end
    end
    return resources
  end



  def recorded_hours
    @recorded_hours = Array.new
      if organization.organization_type.name = "Nonprofit"
        person.recorded_hours.each do |rh|
          if rh.opportunity && rh.opportunity.organization.id === self.organization.id
            if rh.opportunity_role
              @opportunity_role_name = rh.opportunity_role.name
            end
            @recorded_hours <<
                {
                    id: rh.id,
                    hours: rh.hours,
                    opportunity: {name:rh.opportunity.name},
                    opportunity_role: {name: @opportunity_role_name}
                }
          end
        end
      elsif organization.organization_type.name = "Volunteer Group"
        person.recorded_hours.each do |rh|
          if rh.organization.id === organization.id
            @recorded_hours << rh
          end
        end
      end
    return @recorded_hours
  end

  def opportunities
    @opportunities = Array.new
    person.opportunities.each do |o|
      person_opportunity = PersonOpportunity.new
      person_opportunity.person = person
      person_opportunity.opportunity = o
      person_opportunity.total_hours = 0
      @all_related_opportunities << person_opportunity
      @opportunities.push(o)
    end
    recorded_hours.each do |rh|
      if rh.opportunity && !@opportunities.include?(rh.opportunity)
        person_opportunity = PersonOpportunity.new
        person_opportunity.person = person
        person_opportunity.total_hours = rh.hours
        person_opportunity.opportunity = rh.opportunity
        @all_related_opportunities << person_opportunity
        @opportunities << person_opportunity.opportunity
      elsif rh.opportunity && @opportunities.include?(rh.opportunity)
        existing_opportunities = @all_related_opportunities.select { |po| po.opportunity_id == rh.opportunity.id}
        existing_opportunities.each do |eo|
          eo.total_hours += rh.hours
        end
      end
    end
    return @all_related_opportunities
  end


end
