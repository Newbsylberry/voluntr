class PersonMailer < ActionMailer::Base
  require 'open-uri'
  default from: "admin@voluapp.com"

  def send_report(email, report)
    attachments["volunteering_report.pdf"] = open(report.resource.url).read

    mail(to: email, subject: "Your Volunteering Report from Volu")
  end


end
