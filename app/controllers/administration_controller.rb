class AdministrationController < ApplicationController
  def contact
    @email = params[:email]
    @content = params[:content]

    AdministrationMailer.contact_email(@email, @content).deliver
  end


  def feedback
    puts params[:email]
    AdministrationMailer.feedback_email(params[:data][:email],
                                        params[:data][:description],
                                        params[:data][:current_state]).deliver
  end

  def volunteer_drive_leaderboard
    # @opportunities = Array.new
    @recorded_hours = Array.new
    @teams = Array.new
    @nonprofits = Array.new
    @volunteers = Array.new
    @volunteers_count = 0
    @volunteer_hours = 0
    [
        "OCRRA EARTH DAY LITTER CLEANUP",
        "40 Below Coffee Orientation Session",
        "Free-throw Contest in the Canyon",
        "West Onondaga Street Alliance Earth Clean Up Day 2016",
        "Sammy Sweetheart: Sigma Alpha Mu and the Alzheimer's Association Student Org at SU - Opening Ceremony",
        "Sammy Sweetheart: Sigma Alpha Mu and the Alzheimer's Association Student Org at SU: PowderPuff Football",
        "Sammy Sweetheart: Sigma Alpha Mu and the Alzheimer's Association Student Org at SU: Tabling",
        "Sammy Sweetheart: Sigma Alpha Mu and the Alzheimer's Association Student Org at SU: Tabling",
        "Sammy Sweetheart: Sigma Alpha Mu and the Alzheimer's Association Student Org at SU: BBQ and Raffle Auction",
        "Sammy Sweetheart: Sigma Alpha Mu and the Alzheimer's Association Student Org at SU: Closing Ceremony",
        "Alzheimer's Association Student Org at SU; Tabling",
        "On Point for College Celebration 2016",
        "Kitchen Volunteer"
    ].each do |name|
      opportunity = Opportunity.find_by_name(name.to_s)
      @volunteers_count += opportunity.total_people_recording
      @volunteer_hours += opportunity.recorded_hours.sum(:hours)
      opportunity.recorded_hours.each do |rh|
        if rh.person
          if @volunteers.any?{|vol| vol[:name] === "#{rh.person.first_name} #{rh.person.last_name}"}
            existing_volunteers = @volunteers.select { |t| t[:name] == "#{rh.person.first_name} #{rh.person.last_name}"}
            existing_volunteers.each do |ev|
              if ev[:hours]
                ev[:hours] += rh.hours
              end
              if ev[:events]
                ev[:events] += 1
              end
            end
          else
            @volunteers << {name: "#{rh.person.first_name} #{rh.person.last_name}", events: 1, hours: rh.hours}
          end
        end
        if rh.organization_id
          volunteer_group = Organization.find(rh.organization_id)
          if @teams.any?{|team| team[:name] === volunteer_group.name}
            existing_groups = @teams.select { |t| t[:name] == volunteer_group.name }
            existing_groups.each do |eg|
              if eg[:hours]
                eg[:hours] += rh.hours
              end
              if eg[:events]
                eg[:events] += 1
              end
            end
          else
            @teams << {name: volunteer_group.name, hours: rh.hours, events: 1}
          end
        end
        ap @nonprofits
        if @nonprofits.any?{|npo| npo[:name] == rh.opportunity.organization.name}
          existing_npos = nonprofits.select { |t| t[:name] == rh.opportunity.organization.name }
          existing_npos.each do |npo|
            if npo[:hours]
              npo[:hours] += rh.hours
            end
            if npo[:events]
              npo[:events] += 1
            end
          end
        else
          @nonprofits << {name: rh.opportunity.organization.name, hours: rh.hours, events: 1}
        end
      end
    end
    @non_profit_hours = []
    @non_profit_events = []
    @individual_hours = []
    @individual_events = []
    @group_hours = []
    @group_events = []
    @nonprofits.each do |npo|
      @non_profit_events << {name: npo[:name], value: npo[:events]}
      @non_profit_hours << {name: npo[:name], value: npo[:hours]}
    end
    @volunteers.each do |vol|
      @individual_hours << {name: vol[:name], value: vol[:hours]}
      @individual_events << {name: vol[:name], value: vol[:events]}
    end
    @teams.each do |team|
      @group_hours << {name: team[:name], value: team[:hours]}
      @group_events << {name: team[:name], value: team[:events]}
      # @group_per_person << {name: team[:name], value: team[:hours]}
    end
    render json:
               {
                   leaderboard:
                       {
                           volunteers:  @volunteers_count,
                           volunteer_hours:  @volunteer_hours,
                           volunteer_dollars: @volunteer_hours * 26.86,
                           team_most_active: [],
                           non_profit_hours: @non_profit_hours,
                           individual_hours: @individual_hours,
                           non_profit_additional: {
                               total_events: @non_profit_events
                           },
                           individual_additional: {
                               total_events: @individual_events
                           },
                           team_additional: {
                               hours_per_person: [],
                               total_hours: @group_hours,
                               total_events: @group_events,
                               participation_rate: []
                           },
                       }
               }
  end
end