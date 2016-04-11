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
    url = @opportunity.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date])).resource.url
    render json: {url: url}
  end

  def person
    @person = Person.find(params[:id])
    @organization = Organization.find(params[:organization_id])

    render json: @person.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date]))
  end

  def export_person_report
    @person = Person.find_by_email(params[:email])
    if !@person.nil?
    PersonMailer.send_report(
        params[:email],
        @person.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date]))
    ).deliver_now
    else
      render json: {error: "We don't have a record of that email address, sorry!"}, status: 500
    end
  end

  def organization
    @organization = Organization.find(params[:organization_id])
    url = @organization.generate_report(DateTime.parse(params[:start_date]), DateTime.parse(params[:end_date])).resource.url
    render json: {url: url}
  end

end