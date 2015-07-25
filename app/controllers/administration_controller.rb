class AdministrationController < ApplicationController
  def contact
    @email = params[:email]
    @content = params[:content]

    AdministrationMailer.contact_email(@email, @content).deliver
  end


  def feedback
    puts params[:email]
    AdministrationMailer.feedback_email(params[:data][:email],
                                        params[:data][:description],
                                        params[:data][:current_state]).deliver
  end

end