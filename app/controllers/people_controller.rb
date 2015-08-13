class PeopleController < ApplicationController


  def import
    PersonImporter.new(params[:people], params[:organization_id]).enqueue
  end

  def show
      @person = Person.find(params[:id])

      render json: @person, serializer: PersonSerializer
  end

  def create
    if params[:email] != ""
        @person = Person.create_with(locked: false)
                          .find_or_initialize_by(email: params[:email])
    else params[:phone]
        @person = Person.create_with(locked: false)
                    .find_or_initialize_by(phone: params[:phone])
    end


    @person.first_name = params[:first_name]
    @person.last_name = params[:last_name]

    @person.save

    if params[:organization_id]
      @person.add_to_organization(Organization.find(params[:organization_id]))
    end

    render json: @person, serializer: PersonSerializer
  end

  def update
    @person = Person.find(params[:id])


    @person.update_columns(person_params)

    if params[:schedule]
      @person.update_schedule(params)
      @person.save
    end

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
    params.require(:person).permit(:id, :first_name, :address_1, :address_2, :last_name, :phone, :email,
                                   :fb_id, :city, :state, :zip_code,)
  end

end