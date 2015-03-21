class PeopleController < ApplicationController
  respond_to :json

  def import
    People.import(params[:file])
    CSV.foreach(file.path, headers: true) do |row|
      People.create! row.to_hash

    end
  end

  def show
      @person = Person.find(params[:id])

      render json: @person, serializer: PersonSerializer
  end

  def create
    @person = Person.create(person_params)
    if params[:organization_id]
      @organization_person = OrganizationPerson.new
      @organization_person.person_id = @person.id
      @organization_person.organization_id = params[:organization_id]
      @organization_person.save
    end

    respond_with @person
  end

  def opportunities
    @person = Person.find(params[:id])

    render json: @person.opportunities, each_serializer: OpportunitySerializer
  end



  private

  def person_params
    params.require(:person).permit(:id, :first_name, :last_name, :phone, :email,
                                   :fb_id, :address, :city, :state, :zip_code,)
  end

end