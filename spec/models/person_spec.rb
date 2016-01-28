RSpec.describe Person, "Working with the people model" do
  context "When creating a person" do
    before(:each) do
      @person = Person.create(email: "steve@steve.com")
    end

    it "should not create a person if there is already a person with that email address registered" do
      expect(Person.new(email:"steve@steve.com")).to_not be_valid
    end

    it "#add_to_organization" do
      @person = create(:person)
      organization = create(:organization)

      @person.add_to_organization(organization, "Hello World")
      expect(@person.organizations).to include(organization)
    end

    it "#find_or_create_from_params - create an unknown person" do
      params = {"first_name"=>"Chris", "last_name"=>"McCarthy", "email"=>"chris@voluapp.com"}
      @person = Person.find_or_create_from_params(params)
      expect(@person.first_name).to eq("Chris")
    end

    it "#find_or_create_from_params find a known person" do
      params = {email: 'chris@voluapp.com'}
      create(:person, first_name: "Sue", email: "chris@voluapp.com")

      @person = Person.find_or_create_from_params(params)
      expect(@person.first_name).to eq("Sue")
    end


    pending "It should create an organization person if an organization id is present and the record doesn't already exist"

  end

  context "When displaying people" do
    before(:each) do
      @person = create(:person, :with_recorded_hours_and_opportunity, email: "newemail@email.com")
    end

    it "#total_hours" do
      expect(@person.total_recorded_hours).to eq(3)
    end

    it "#all_related_opportunities" do
      @opportunities = Array.new
      @total_hours = 0
      @opportunity1 = @person.recorded_hours.first.opportunity
      @opportunity2 = create(:opportunity, name: "New Opportunity")
      @person.opportunities.push(@opportunity2)

      @person.all_related_opportunities.each do |po|
        @opportunities.push(po.opportunity)
        @total_hours += po.total_hours
      end


      expect(@total_hours).to eq(3)
      expect(@opportunities).to include(@opportunity1 && @opportunity2 && @person.opportunities.first)

    end

    it "#update_schedule" do
      # @person = Person.new
      # @params = Hash.new
      # @params[:schedule] = Hash.new
      # @params[:schedule][:morning] = Hash.new
      # @params[:schedule][:afternoon] = Hash.new
      # @params[:schedule][:night] = Hash.new
      # @params[:schedule][:morning]["wednesday"] = true
      # @params[:schedule][:afternoon]["monday"] = true
      # @params[:schedule][:afternoon]["tuesday"] = true
      # @params[:schedule][:afternoon]["wednesday"] = true
      # @params[:schedule][:night]["thursday"] = true
      # @person.update_schedule(@params)
      # expect(IceCube::Schedule.from_yaml(@person.schedule["morning_schedule"]).occurrences(Time.now + 6.days).count).to eq(1)
      # expect(IceCube::Schedule.from_yaml(@person.schedule["afternoon_schedule"]).occurrences(Time.now + 6.days).count).to eq(4)
      # expect(IceCube::Schedule.from_yaml(@person.schedule["night_schedule"]).occurrences(Time.now + 6.days).count).to eq(1)
    end


    it "#availability_schedule" do
      @schedules = Hash.new
      @schedules["morning_schedule"] = "---\n:start_time: &1 2015-07-14 06:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 12:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["afternoon_schedule"] = "---\n:start_time: &1 2015-07-14 12:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 18:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["night_schedule"] = "---\n:start_time: &1 2015-07-14 18:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-15 00:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @person = create(:person, email: "Chris@chris.com", schedule: @schedules)
      expect(@person.availability_schedule("2015-07-15T08:02:17-05:00", "2015-08-15T08:02:17-05:00").count).to be(93)
    end

    it "#availability_schedule" do
      @schedules = Hash.new
      @schedules["morning_schedule"] = "---\n:start_time: &1 2015-07-14 06:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 12:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["afternoon_schedule"] = "---\n:start_time: &1 2015-07-14 12:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-14 18:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @schedules["night_schedule"] = "---\n:start_time: &1 2015-07-14 18:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-15 00:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n"
      @person = create(:person, email: "Chris@chris.com", schedule: @schedules)
      expect(@person.availability_schedule("2015-07-15T08:02:17-05:00", "2015-08-15T08:02:17-05:00").count).to be(93)
    end

    it "#add_schedule" do
      @person = create(:person, email: "Chris@chris.com", schedule: @schedules)
      @person.add_schedule("person", "---\n:start_time: &1 2015-07-14 18:00:00.000000000 -06:00\n:start_date: *1\n:end_time: 2015-07-15 00:00:00.000000000 -06:00\n:rrules:\n- :validations:\n    :day:\n    - 0\n    - 1\n    - 2\n    - 3\n    - 4\n    - 5\n    - 6\n  :rule_type: IceCube::WeeklyRule\n  :interval: 1\n  :week_start: 0\n:rtimes: []\n:extimes: []\n")
    end
  end
end