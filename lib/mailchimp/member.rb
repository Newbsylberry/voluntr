class Mailchimp
  class Member
    attr_accessor :id, :first_name, :last_name, :email_address, :status

    def initialize(params)
      @id = params["id"]
      @first_name = params["merge_fields"]["FNAME"]
      @last_name = params["merge_fields"]["LNAME"]
      @email_address = params["email_address"]
      @status = params["status"]
      @subscribers = params["stats"]["member_count"]
    end

  end
end