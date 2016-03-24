class OpportunityReportPdf < Prawn::Document
  def initialize(opportunity, recorded_hours, opportunity_roles, opportunity_groups, start_date, end_date, top_volunteers, top_suffixes)
    super()
    @opportunity = opportunity
    @recorded_hours = recorded_hours
    @opportunity_roles = opportunity_roles
    @opportunity_groups = opportunity_groups
    @start_date = start_date
    @end_date = end_date
    @top_volunteers = top_volunteers
    @top_suffixes = top_suffixes
    @total_hours = opportunity.recorded_hours.where(:date_recorded => start_date..end_date).sum(:hours)
    # @total_volunteers_registered = opportunity.person_opportunities.where(:created_at => start_date..end_date).count
    @total_number_of_volunteers = opportunity.recorded_hours.where(:date_recorded => start_date..end_date).map(&:person_id).uniq.count
    # @opportunities = opportunities
    header
    recorded_hours_graph
    text_content
    top_lists
    start_new_page
    opportunity_roles_graph
    opportunity_role_text
    start_new_page
  end

  def header
    #This inserts an image in the pdf file and sets the size of the image
    bounding_box([0, cursor], :width => 600, :height => 25) do
      text "#{@opportunity.name} Summary Between #{@start_date.strftime("%m-%d-%Y")} and #{@end_date.strftime("%m-%d-%Y")}", size: 16
    end

    bounding_box([0, cursor], :width => 270, :height => 25) do
      text "#{@opportunity.organization.name}", size: 14
    end

    bounding_box([0, cursor], :width => 270, :height => 50) do
      text "Created At: #{Time.now.strftime("%A - %B %-d, %Y")}", size: 11
    end
    # if @organization.fb_id
    #   image "#{Rails.root}/app/assets/images/header.png", width: 530, height: 150
    # end
  end

  def recorded_hours_graph
    image @recorded_hours, position: :center
  end

  def text_content
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
    y_position = cursor - 50

    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    bounding_box([30, y_position], :width => 150, :height => 100) do
      text "#{@total_number_of_volunteers}", size: 24, align: :center
      text "Total Volunteers", size: 15, style: :bold, align: :center
    end
    bounding_box([205, y_position], :width => 150, :height => 100) do
      text "#{@total_hours}", size: 24, align: :center
      text "Total Hours", size: 15, style: :bold, align: :center
    end
    bounding_box([380, y_position], :width => 150, :height => 100) do
      text "$#{@total_hours * 22}", size: 24, align: :center
      text "Volunteer Hour Worth", size: 15, style: :bold,align: :center
    end
  end

  def top_lists
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above

    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    bounding_box([50, 180], :width => 200, :height => 200) do
      text "Top Individual Volunteers", size: 16, align: :center, style: :bold
      @top_volunteers.each do |tv|
      text "#{tv[:name]}                 #{tv[:hours]} hours", size: 12
      end
    end
    bounding_box([330, 180], :width => 200, :height => 200) do
      text "Top Email Suffixes", size: 16, align: :center, style: :bold
      @top_suffixes.each do |ts|
        text "#{ts[:suffix]}                 #{ts[:hours]} hours", size: 12
      end
    end
  end


    # bounding_box([300, y_position], :width => 270, :height => 400) do
    #   text "Useful Metrics:", size: 15, style: :bold
    #   if @total_number_of_volunteers != 0
    #     text "Average Number of Hours Per Volunter: #{@total_hours / @total_number_of_volunteers}",
    #          size: 11
    #     text "Total Volunteers Registered / Actual Volunteers: #{@total_volunteers_registered / @total_number_of_volunteers}",
    #          size: 11
    #   end
    # end

    def opportunity_roles_graph
      font_size(24) { text "Opportunity Roles", align: :center }
      image @opportunity_roles, position: :center
    end

    def opportunity_role_text
      # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
      y_position = cursor - 50
      # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
      bounding_box([0, y_position], :width => 540, :height => 400) do
        @opportunity.opportunity_roles.each do |ors|
          font_size(18) {text "#{ors.name}: #{ors.total_recorded_hours} hours |  #{ors.total_people} people"}
        end
      end
    end

  def groups_graph
    font_size(24) { text "Groups", align: :center }
    image @opportunity_groups, position: :center
  end

  def groups_text
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
    y_position = cursor - 50
    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    bounding_box([0, y_position], :width => 540, :height => 400) do
      @opportunity.groups.each do |g|
        font_size(18) {text "#{g.name}: #{g.total_recorded_hours} hours | #{g.total_people} people"}
      end
    end
  end
end

