class Mailchimp
  class Campaign
    attr_accessor :id, :name

    def initialize(params)
      @id = params["id"]
      @name = params["settings"]["title"]
      @opens = params["report_summary"]["opens"]
      @open_rate = params["report_summary"]["open_rate"]
      @clicks = params["report_summary"]["clicks"]
      @subscriber_clicks = params["report_summary"]["clicks"]
      @unique_opens = params["report_summary"]["unique_opens"]
    end

  end
end