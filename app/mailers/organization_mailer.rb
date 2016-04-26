class OrganizationMailer < ApplicationMailer

  def contact_organization_email(organization, contacting_organization, message)
    @administrator_emails = Array.new
    @organization_emails = Array.new
    organization.users.each do |u|
      @administrator_emails << u.email
    end
    contacting_organization.users.each do |u|
      @organization_emails << u.email
    end
    @organization = contacting_organization
    @message = message
    ap @administrator_emails
    mail(to: @administrator_emails, reply_to: @organization_emails, subject: "#{@organization.name} Contacting You From Volu")
  end
end
