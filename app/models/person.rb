class Person < ActiveRecord::Base
  has_many :organization_people
  has_many :organizations, through: :organization_people
  has_many :person_opportunities
  has_many :opportunities, through: :person_opportunities
  has_many :recorded_hours
  attr_accessor :opportunity_hours, :opportunity_instances_count, :opportunity_role, :opportunity_photo_consent

  validates :email, uniqueness: true

  def total_recorded_hours
    recorded_hours.sum(:hours)
  end

  def all_related_opportunities
    @all_related_opportunities = Array.new
    @opportunities = Array.new
    opportunities.each do |o|
      person_opportunity = PersonOpportunity.new
      person_opportunity.person = self
      person_opportunity.opportunity = o
      person_opportunity.total_hours = 0
      @all_related_opportunities << person_opportunity
      @opportunities.push(o)
    end
    recorded_hours.each do |rh|
      if rh.opportunity && !@opportunities.include?(rh.opportunity)
        person_opportunity = PersonOpportunity.new
        person_opportunity.person = self
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

  def add_to_organization(organization)
    @person_organization = OrganizationPerson.create_with(locked: false).
        find_or_initialize_by(person: self, organization: organization)
    if !organization.organization_mailing_services.empty?
      @person_organization.add_to_lists(Array.new << organization.default_list("mail_chimp"))
    end
    if !@person_organization.persisted?
      @person_organization.send_registration_confirmation
    end
    @person_organization.save
  end




end

