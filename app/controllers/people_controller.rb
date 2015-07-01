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

    @person.save
    puts @person.id

    if params[:organization_id]
      @organization_person = OrganizationPerson.create_with(locked: false).
      find_or_initialize_by(person_id: @person.id, organization_id: params[:organization_id])

        @organization_person.save
    end

    render json: @person, serializer: PersonSerializer
  end

  def update
    @person = Person.find(params[:id])

    @person.update_columns(person_params)

    render json: @person
  end

  def opportunities
    @person = Person.find(params[:id])

    render json: @person.all_related_opportunities, each_serializer: PersonOpportunitySerializer
  end

  def recorded_hours
    @person = Person.find(params[:id])

    render json: @person.recorded_hours, each_serializer: RecordedHourSerializer
  end



  private

  def person_params
    params.require(:person).permit(:id, :first_name, :last_name, :phone, :email,
                                   :fb_id, :address, :city, :state, :zip_code,)
  end

end