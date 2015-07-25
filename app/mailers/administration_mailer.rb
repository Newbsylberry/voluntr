class AdministrationMailer < ApplicationMailer
    default from: "admin@voluapp.com"

    def contact_email(email, content)
      @content = content
      @email = email
      mail(to: 'christian@voluapp.com', cc: 'aj@voluapp.com', subject: "Volu Contact Email")
    end

    def feedback_email(email, description, current_state)
      @email = email
      @description = description
      @current_state = current_state


      mail(to: 'support@voluapp.com', from: email, subject: "It's me, Franklin.")
    end
end
