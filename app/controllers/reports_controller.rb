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

  def person
    @person = Person.find(params[:id])
    @organization = Organization.find(params[:organization_id])

    render json: @person.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date]))
  end

  def export_person_report
    ap params
    @person = Person.find_by_email(params[:email])

    PersonMailer.send_report(
        params[:email],
        @person.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date]))
    ).deliver_now
  end

  def organization
    @organization = Organization.find(params[:organization_id])
    url = @organization.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date])).resource.url
    ap url
    render json: {url: url}
  end

end