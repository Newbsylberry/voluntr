class RecordedHour < ActiveRecord::Base
  include Elasticsearch::Model
  belongs_to :group
  belongs_to :organization
  belongs_to :opportunity
  belongs_to :person
  belongs_to :opportunity_role


  # validates :person_id, uniqueness: { scope: :opportunity_id }, if: :already_recorded_for_instance?




  def send_sign_in_email
    if self.person && self.person.email
      OpportunityMailer.opportunity_sign_in_email(person, opportunity, self).deliver
    end
  end

  def already_recorded_for_instance?
    if opportunity
      instance = IceCube::Schedule.from_yaml(opportunity.object_schedules.last.schedule)
      instance.next_occurrence(DateTime.parse(date_recorded.to_s))
      opportunity.start = instance.start_time
      opportunity.duration = instance.duration
      if self.date_recorded.between?(opportunity.start, opportunity.start + opportunity.duration.hours)
        return true
      else
        return false
      end
    end
  end

end

