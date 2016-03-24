class PersonReportPdf < Prawn::Document
  def initialize(person, start_date, end_date)
    super()
    @person = person
    @start_date = start_date
    @end_date = end_date
    @summary_graph = Hash.new
    @summary_graph["Recorded Hours"] = Hash.new
    person.recorded_hours.where(date_recorded: start_date..end_date).each do |rh|
      @summary_graph["Recorded Hours"][rh.created_at.strftime("%T - %m/%d/%Y")] = rh.hours
    end
    @total_hours = person.recorded_hours.where(date_recorded: start_date..end_date).sum(:hours)
    @opportunities_count = 0
    person.recorded_hours.where(date_recorded: start_date..end_date).uniq.pluck(:opportunity_id).each do |oid|
      @opportunities_count += 1
    end
    @table = []
    @table << ["Date of Volunteering", "Name of Opportunity", "Organization", "Number of Hours Volunteered"]
    @person.recorded_hours.each do |rh|
      if rh.opportunity && !rh.opportunity.nil?
        opportunity_name = "#{rh.opportunity.name.to_s}"
      else
        opportunity_name = "DELETED"
      end
      if rh.organization && !rh.organization.nil?
        organization_name = "#{rh.organization.name.to_s}"
      else
        organization_name = "DELETED"
      end
      @table <<
          [
              "#{rh.created_at.strftime("%m/%d/%Y")}",
              opportunity_name,
              organization_name,
              "#{rh.hours.to_f}"
      ]
    end
    # @opportunities = opportunities
    header
    summary_chart
    text_content
    start_new_page
    opportunity_list
  end

  def header
    bounding_box([0, cursor], :width => 600, :height => 25) do
      text "#{@person.first_name} #{@person.last_name} Summary Between #{@start_date.strftime("%m-%d-%Y")} and #{@end_date.strftime("%m-%d-%Y")}", size: 16, align: :center
    end
    bounding_box([0, cursor], :width => 600, :height => 25) do
      text "#{Time.now.strftime("%A - %B %-d, %Y")}", size: 11, align: :center
    end
  end

  def summary_chart
    text "Recorded Hours Graph", size: 16, align: :center
    if !@summary_graph["Recorded Hours"].nil? && @summary_graph["Recorded Hours"].count <= 1
      chart @summary_graph, colors: %w(9C27B0 2196F3)
     elsif !@summary_graph["Recorded Hours"].nil? && @summary_graph["Recorded Hours"].count > 1
      chart @summary_graph, type: :line, colors: %w(9C27B0 2196F3)
    end
  end

  def text_content
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
    y_position = cursor - 50

    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    bounding_box([30, y_position], :width => 150, :height => 100) do
      text "#{@opportunities_count}", size: 24, align: :center
      text "Total Opportunities", size: 15, style: :bold, align: :center
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

  def opportunity_list
    table(@table)
  end
end
