class PeopleController < ApplicationController
  def import
    People.import(params[:file])
    CSV.foreach(file.path, headers: true) do |row|
      People.create! row.to_hash

    end
  end




end