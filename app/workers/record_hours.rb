class RecordOrganizationHours
  @queue = :record_organization_hours_queue

  def self.perform()
    Organization.all.each do |o|
      o.opportunities.each do |oo|
        @recorded_hours = PersonOpportunityRecordedHour.new
        @recorded_hours.opportunity_id = oo.id

        # This needs to only interate if the schedule has an occurrence on this
        # date.
        if oo.start_schedule
          oo.person_opportunities.each do |p|
            if p.schedule
              schedule = IceCube::Schedule.from_yaml(p.schedule)
              if schedule.occurs_on?(Date.today)
                @recorded_hours.person_id = p.person_id
                @recorded_hours.hours = oo.duration
                @recorded_hours.save
              end
            end
          end
        elsif (24.hours.ago..Time.now).cover?(Time.at(oo.start_time.to_i / 1000))
          oo.person_opportunities.each do |p|
            puts p
            puts Time.now
            @recorded_hours.person_id = p.person_id
            @recorded_hours.hours = oo.duration
            @recorded_hours.save
          end
        end
      end
    end
  end


end