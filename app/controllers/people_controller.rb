class PeopleController < ApplicationController
  include IceCube
  require_dependency ("#{Rails.root}/lib/schedule_tool.rb")

  def import
    if !params[:address_column]
      params[:address_column] = false
    end
    if !params[:name_column]
      params[:name_column] = false
    end

    PersonImporter.perform_later(params[:people], params[:organization_id], params[:address_column], params[:name_column])

    params = {success_message: "Your spreadsheet will be imported now!"}
    render json: params
  end

  def show
    @person = Person.find(params[:id])



    render json: @person, serializer: PersonSerializer
  end

  def create
    if params[:person][:email] && !params[:person][:email].blank? && !params[:person][:email].nil?
      ap "email"
      @person = Person.create_with(locked: false)
                    .find_or_initialize_by(email: params[:person][:email])
    elsif params[:person][:phone] && !params[:person][:phone].blank? && !params[:person][:phone].nil?
      ap "phone"
      @person = Person.create_with(locked: false)
                  .find_or_initialize_by(phone: params[:person][:phone])
    else
      @person = Person.new
    end


    if @person.new_record?
      @person.assign_attributes(person_params)
      @person.save
    elsif !@person.new_record?
      @person.update(person_params)
    end

    if params[:person][:schedule]
      @person.update_schedule(params)
      @person.save
    end

    if params[:organization_id]
      @person.add_to_organization(Organization.find(params[:organization_id]), params[:notes])
    end
    ap @person
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

  def opportunities
    @person = Person.find(params[:id])

    render json: @person.all_related_opportunities, each_serializer: PersonOpportunitySerializer
  end

  def person_availability_schedule
    @person = Person.find(params[:id])

    render json: @person.availability_schedule(params[:start], params[:end])
  end

  def add_schedule
    @person = Person.find(params[:id])

    @person.add_schedule(params[:calendar][:name], SchedulerTool.schedule_from_params(params[:calendar], Opportunity.new))
    render json: @person
  end

  def recorded_hours
    @person = Person.find(params[:id])

    render json: @person.recorded_hours, each_serializer: RecordedHourSerializer
  end




  private

  def person_params
    params.require(:person).permit(:id, :first_name, :address_1, :address_2, :last_name, :phone, :email,
                                   :fb_id, :city, :state, :zip_code, :occupation, :organization_name,
                                   :occupation)
  end

end