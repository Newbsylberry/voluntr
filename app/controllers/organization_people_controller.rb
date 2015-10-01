class OrganizationPeopleController < ApplicationController
  def show
    @person = OrganizationPerson.
        find_by_organization_id_and_person_id(params[:organization_id], params[:person_id])

    render json: @person, serializer: OrganizationPersonSerializer
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    @organization_person = OrganizationPerson.find(params[:id])

    if @organization_person.update(organization_person_params)
      render json: @organization_person
    else
      render json: @organization_person.errors, status: :unprocessable_entity
    end
  end


  private

  def organization_person_params
    params.require(:organization_person).permit(:id, :notes)
  end

end
