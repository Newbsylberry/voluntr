class ReportsController < ApplicationController
  require 'open-uri'

  def opportunity
    @opportunity = Opportunity.find(params[:id])

    open("#{@opportunity.name}_report.png", 'wb') do |file|
      file << open("http://export.highcharts.com/?#{params[:url]}").read
    end
  end

end