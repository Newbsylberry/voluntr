class OpportunitySerializer < ActiveModel::Serializer
  include IceCube
  attributes :id, :fb_id, :duration, :name, :organization_id, :start_time, :end_time, :location, :longitude, :latitude, :description,
             :opportunity_type_id, :start, :end, :title, :color, :allDay,
             :schedule_to_string, :start_schedule, :ical, :address, :city, :state,
             :zip_code, :volunteer_goal, :object_schedules, :organization_email_templates
             # :signed_up_volunteers, :person_opportunities, :signed_up_volunteer_count


  def duration
    if self.start && self.end
      ((self.end.to_i - self.start.to_i) / 3600000).round
    end
  end

  def title
    name
  end

  def start
    start_time
  end

  def end
    end_time
  end

  def allDay
    false
  end

  def timezone
    'local'
  end

  def schedule_to_string
    if self.start_schedule
      IceCube::Schedule.from_yaml(start_schedule).rrules.each do |r|
        return r.to_s
      end
    end
  end

  def signed_up_volunteers
    @instance_volunteers = Array.new
    if self.start_schedule

      person_opportunities.each do |p|

        if p.schedule
          schedule = IceCube::Schedule.from_yaml(p.schedule)

          if schedule.occurs_on?(Time.at(@options[:instance_date].to_i / 1000))

            @instance_volunteers.push(Person.find(p.person_id))
          end
        else
          @instance_volunteers.push(Person.find(p.person_id))
        end

      end
    elsif !self.start_schedule
      person_opportunities.each do |p|
        @instance_volunteers.push(Person.find(p.person_id))
      end
    end
    return @instance_volunteers
  end

  def signed_up_volunteer_count
    signed_up_volunteers.count
  end



  def ical
    if self.object_schedules
      @schedule = self.object_schedules.order("updated_at").last
      keys = Array.new
      values = Array.new
      IceCube::Schedule.from_yaml(@schedule.schedule).rrules.each do |r|
        r.to_ical.split(';').each do |s|
          s.split("=").map.with_index do |item, index|
            if index == 0
              keys.push(item)
            else
              values.push(item)
            end
          end
        end
      end
      parsed_rules = Hash[keys.zip(values.map {|i| i})]
      # if parsed_rules["FREQ"] == "WEEKLY"
      # repeat_days = Array.new
      # parsed_rules['BYDAY'].split(',').each do |d|
      #   repeat_days.push(d)
      # end
      # parsed_rules[:BYDAY] = repeat_days
      # puts parsed_rules.as_json
      # return parsed_rules.as_json
      # end
    end
  end


end
