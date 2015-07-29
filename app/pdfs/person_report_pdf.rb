class PersonReportPdf < Prawn::Document
  def initialize(person, graph_name, start_date, end_date, organization)
    super()
    @person = person
    @organization = organization
    @graph_name = graph_name
    @start_date = start_date
    @end_date = end_date
    @total_hours = person.recorded_hours.where(:date_recorded => start_date..end_date).sum(:hours)
    @total_number_of_registered_opportunities = person.person_opportunities.where(:created_at => start_date..end_date).count
    @total_number_of_attended_opportunities = person.recorded_hours.where(:date_recorded => start_date..end_date).count
    # @opportunities = opportunities
    header
    graphs
    text_content
  end

  def header
    #This inserts an image in the pdf file and sets the size of the image
    bounding_box([0, cursor], :width => 600, :height => 25) do
      text "#{@person.first_name} #{@person.last_name} Summary Between #{@start_date.strftime("%m-%d-%Y")} and #{@end_date.strftime("%m-%d-%Y")}", size: 16
    end

    bounding_box([0, cursor], :width => 270, :height => 25) do
      text "#{@organization.name}", size: 14
    end

    bounding_box([0, cursor], :width => 270, :height => 50) do
      text "Created At: #{Time.now.strftime("%A - %B %-d, %Y")}", size: 11
    end
    # if @organization.fb_id
    #   image "#{Rails.root}/app/assets/images/header.png", width: 530, height: 150
    # end
  end

  def graphs
    image @graph_name, position: :center
  end

  def text_content
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
    y_position = cursor - 50

    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    bounding_box([0, y_position], :width => 270, :height => 400) do
      text "Opportunity Stats:", size: 15, style: :bold
      text "Numer of Events Registered For: #{@total_number_of_registered_opportunities}", size: 11
      text "Number of Opportunities Attended: #{@total_number_of_registered_opportunities}", size: 11
      text "Total Recorded Hours: #{@total_hours}", size: 11


    end


    bounding_box([300, y_position], :width => 270, :height => 400) do
      text "Useful Metrics:", size: 15, style: :bold
      if @total_number_of_attended_opportunities != 0
        text "Total Attended Opportunities / Total Opportunities Registered For:
#{@total_number_of_registered_opportunities / @total_number_of_attended_opportunities}",
             size: 11
        text "Hours Recorded Per Opportunitiy #{@total_hours / @total_number_of_attended_opportunities}",
             size: 11
      end
    end


    # def table_content
    #   # This makes a call to product_rows and gets back an array of data that will populate the columns and rows of a table
    #   # I then included some styling to include a header and make its text bold. I made the row background colors alternate between grey and white
    #   # Then I set the table column widths
    #   table product_rows do
    #     row(0).font_style = :bold
    #     self.header = true
    #     self.row_colors = ['DDDDDD', 'FFFFFF']
    #     self.column_widths = [40, 300, 200]
    #   end
    # end
    #
    # def product_rows
    #   [['#', 'Name', 'Price']] +
    #       @products.map do |product|
    #         [product.id, product.name, product.price]
    #       end
    # end
  end
end
