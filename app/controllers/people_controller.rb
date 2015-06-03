class PeopleController < ApplicationController


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
    @person = Person.create_with(locked: false)
                          .find_or_initialize_by(email: params[:email])

    @person.first_name = params[:first_name]
    @person.last_name = params[:last_name]
    if params[:organization_id]
      @organization_person = OrganizationPerson.find_or_initialize_by(person_id: @person.id,
                                                                      organization_id: params[:organization_id])

        @organization_person.save
    end

    @person.save
    render @person
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