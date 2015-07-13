class OpportunitySerializer < ActiveModel::Serializer
  include IceCube
  attributes :id, :fb_id, :duration, :name, :organization_id, :start_time, :end_time, :location, :longitude, :latitude, :description,
             :opportunity_type_id, :start, :end, :title, :color, :allDay, :schedule,
             :schedule_to_string, :start_schedule, :ical, :address, :city, :state,
             :zip_code, :volunteer_goal, :recorded_hours, :organization_email_templates, :opportunity_roles,
             :total_recorded_hours, :total_people_recording,
             :instance_hours, :instance_people_count, :selected_instance_recorded_hours,
              :selected_instance_people_recording, :volunteers
             # :signed_up_volunteers, :person_opportunities, :signed_up_volunteer_count



  def schedule_to_string
    if self.schedule
      IceCube::Schedule.from_yaml(schedule).rrules.each do |r|
        return r.to_s
      end
    end
  end

  def selected_instance_recorded_hours
    if @options[:instance_date]
      @hours = recorded_hours.where(:date_recorded => Time.at(@options[:instance_date].to_i / 1000)
                                               .beginning_of_day..
                               Time.at(@options[:instance_date].to_i / 1000).end_of_day).sum(:hours)
    end
  end

  def past_volunteers
    past_volunteers = Array.new
    past_volunteers
  end

  def selected_instance_people_recording
    if @options[:instance_date]
    recorded_hours.where(:date_recorded => Time.at(@options[:instance_date].to_i / 1000)
                                               .beginning_of_day..
                             Time.at(@options[:instance_date].to_i / 1000).end_of_day)
        .select(:person_id).map(&:person_id).uniq.count
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
    if self.schedule
      keys = Array.new
      values = Array.new
      if !schedule.nil?
      IceCube::Schedule.from_yaml(schedule).rrules.each do |r|
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


end
