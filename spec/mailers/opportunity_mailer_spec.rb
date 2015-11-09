require "rails_helper"

RSpec.describe OpportunityMailer, "Sending an email" do

  context "sending registration email" do
    let(:person_opportunity) { create(:person_opportunity) }
    let(:mail) { OpportunityMailer.opportunity_registration_email("chris.s.mccarthy@gmail.com", person_opportunity) }

    it 'renders the receiver email' do
      expect(mail.to).to eql(["chris.s.mccarthy@gmail.com"])
    end

    it 'renders the sender email' do
      expect(mail.from).to eql(['admin@voluapp.com'])
    end

    it 'assigns @name' do
      expect(mail.body.encoded).to match(person_opportunity.person.first_name)
    end

    it 'assigns @instances' do
      person_opportunity.instances.each do |i|
        expect(mail.body.encoded).to match("Tuesday - September 08, 2015")
      end

    end

    pending "It should send a sign in email"
  end


  context "sending opportunity information email" do
    before(:each) do
      @person_opportunity = create(:person_opportunity)
    end
    let(:person_opportunities) { [@person_opportunity] }
    let(:person) { create(:person, email: "chris@voluapp.com") }
    let(:mail) { OpportunityMailer.upcoming_opportunities_information(person, person_opportunities) }
    it 'renders the receiver email' do
      expect(mail.to).to eql(["chris@voluapp.com"])
    end

    it 'renders the sender email' do
      expect(mail.from).to eql(['admin@voluapp.com'])
    end

    it 'assigns @name' do
      expect(mail.body.encoded).to match(person.first_name)
    end

    it 'shows instances' do
      @person_opportunity.instances.each do |i|
        expect(mail.body.encoded).to match(DateTime.parse(i).strftime("%-m/%e/%Y @ %l:%M %p"))
      end
    end

  end
end
