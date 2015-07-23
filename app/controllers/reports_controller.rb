class ReportsController < ApplicationController
  require 'open-uri'


  def opportunity
    # var optionsJSON = {
    #         title: {
    #             text: "Opportunity Dashboard"
    #         },
    #         xAxis: {
    #             type: 'datetime',
    #             title: {
    #                 text: 'Date'
    #             }},
    #         "series": series
    # };
    @opportunity = Opportunity.find(params[:id])







    render json: @opportunity.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date])),
           serializer: ResourceSerializer
  end

end