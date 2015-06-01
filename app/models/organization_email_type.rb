class OrganizationEmailType < ActiveRecord::Base
  has_many :organization_email_templates


  def introduction_text
    if self.name == "Opportunity Sign In Email"
      "Thanks for volunteering at this event, we appreciate you taking time out of your busy schedule to get involved with our organization"
    elsif self.name == "Opportunity Volunteer Follow Up Email"
      "Thanks again for your participation at our event, we wanted to follow up and give you additional information about the work we do."
    end
  end

  def conclusion_text
    if self.name == "Opportunity Sign In Email"
      "Please help us spread the word about this event, and feel free to approach any staff person for additional information."
    elsif self.name == "Opportunity Volunteer Follow Up Email"
      "We hope that you enjoyed your experience at our event and you register to get involved in the future."
    end
  end

  def marketing_materials
    if self.name == "Opportunity Sign In Email"
      1
    elsif self.name == "Opportunity Volunteer Follow Up Email"
      0
    end
  end

  def upcoming_events
    if self.name == "Opportunity Sign In Email"
      0
    elsif self.name == "Opportunity Volunteer Follow Up Email"
      1
    end
  end


end
