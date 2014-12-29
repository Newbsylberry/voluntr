class UserMailer < ActionMailer::Base
  default from: "admin@voluapp.com"

  def contact_email(email, content)
    @content = content
    @email = email
    mail(to: 'arichichi@chronicleme.com', cc: 'cmccarthy@chronicleme.com', subject: "Volu Contact Email")
  end
end
