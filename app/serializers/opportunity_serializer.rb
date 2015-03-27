class OpportunitySerializer < ActiveModel::Serializer
  include IceCube
  attributes :id, :fb_id, :name, :start_time, :end_time, :location, :longitude, :latitude, :description,
             :opportunity_type_id, :start, :end, :title, :color, :allDay, :schedule_to_string, :start_schedule, :ical




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

  def ical
    if self.start_schedule
      keys = Array.new
      values = Array.new
      IceCube::Schedule.from_yaml(start_schedule).rrules.each do |r|
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
      repeat_days = Array.new
      parsed_rules['BYDAY'].split(',').each do |d|
        repeat_days.push(d)
      end
      parsed_rules[:BYDAY] = repeat_days
      puts parsed_rules.as_json
      return parsed_rules.as_json
    end
  end

end
