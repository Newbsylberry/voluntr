class OpportunityRolesController < ApplicationController
  def index
    @opportunity_roles = OpportunityRole.all

    render json: @opportunity_roles
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @opportunity_role = OpportunityRole.find(params[:id])


    render json: @opportunity_role
  end


  # POST /events
  # POST /events.json
  def create
    @opportunity_role = OpportunityRole.new(opportunity_role_params)


    @opportunity_role.save

    render json: @opportunity_role
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @opportunity_role = OpportunityRole.find(params[:id])



    @opportunity_role.update(opportunity_role_params)
    render json: @OpportunityRole_role
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @opportunity_role = OpportunityRole.find(params[:id])
    @opportunity_role.destroy

    head :no_content
  end

  protected

  def opportunity_role_params
    params.require(:opportunity_role).permit(:id, :name, :description, :opportunity_id)
  end
end
