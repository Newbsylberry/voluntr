class OpportunityInstance < ActiveRecord::Base
  belongs_to :opportunity
  attr_accessor :title, :color, :start, :end

  def start
    instance_date
  end

  def self.get_by_opportunity_and_instance_date(opportunity_id, instance_date)
    @opportunity = Opportunity.find(opportunity_id)
    IceCube::Schedule.from_yaml(@opportunity.schedule).occurs_at?(Time.parse(instance_date))

    return OpportunityInstance.new(opportunity: @opportunity, instance_date: Time.parse(instance_date))
  end

  def instance_volunteers
    instance_volunteers = Array.new
    if !opportunity.person_opportunities.nil?
      opportunity.person_opportunities.each do |po|
        if !po.instances.nil?
          po.instances.each do |i|
            if i > start.beginning_of_day and i < start.end_of_day
              person = Person.find(po.person_id)
              if po.opportunity_role_id
                role = OpportunityRole.find(po.opportunity_role_id)
              end
              instance_volunteers << {person: person,opportunity_role: role, opportunity: opportunity}
            end
          end
        end
      end
    end
    return instance_volunteers
  end

  def instance_roles
    instance_roles = []
    if opportunity.opportunity_roles
      opportunity.opportunity_roles.each do |role|
        role = {name: role.name, id: role.id, volunteers_required: role.volunteers_required, person_opportunities: []}
        if !instance_volunteers.empty?
          instance_volunteers.each do |v|
            if v.opportunity_role && v.opportunity_role.id === role[:id]
              role[:person_opportunities] << {first_name: v.person.first_name, last_name: v.person.last_name, id: v.person.id}
            end
          end
        end
        instance_roles << role
      end
    end
    return instance_roles
  end
end

