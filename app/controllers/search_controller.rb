class SearchController < ApplicationController
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")

  def search_organizations
    results = Organization.search(query: {match: {name: {query: "#{params[:query]}", fuzziness: 2}}})
    # results = Organization.search(query:{ match:  {name: {"#{params[:query]}", fuzziness: "auto"} } })
    render json: results
  end
end
