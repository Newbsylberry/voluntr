require 'httparty'

require './lib/mailchimp/'


class Mailchimp
  include HTTParty
  attr_accessor :lists, :campaigns

  def initialize(client_id, client_secret, code)
    # Do we have a valid API Key?
    unless api_key =~ /\w+-\w{3}/
      raise StandardError, "Invalid API Key"
    end

    domain = api_key.split('-')[1]
    @auth = {username: 'apikey', password: api_key}

    self.class.base_uri "https://#{domain}.api.mailchimp.com/3.0"

    @lists = []
    @campaigns = []
  end

  def account_details
    self.class.get('/', basic_auth: @auth)
  end

  def list_details
    response = self.class.get('/lists', basic_auth: @auth, query: {fields: 'lists.id,lists.name,lists.stats.member_count'})
    if self.lists.empty?
      response["lists"].each {|list| self.lists << Mailchimp::List.new(list)}
    end

    return self.lists
  end

  def campaign_details
    response = self.class.get('/campaigns', basic_auth: @auth)
    if self.campaigns.empty?
       response["campaigns"].each {|campaign| self.campaigns << Mailchimp::Campaign.new(campaign)}
    end

    return self.campaigns
  end

  def check_list_subscriber_status(list_id, email_address)
    @md5 = Digest::MD5.hexdigest(email_address.to_s)

    response = self.class.get('/lists/' + list_id + '/members/' + @md5, basic_auth: @auth)
  end

  def add_list_subscriber(list_id, first_name, last_name, email_address)
    @new_user = Hash.new
    @new_user["email_address"] = email_address
    @new_user["status"] = "subscribed"
    @new_user["merge_fields"] = Hash.new
    @new_user["merge_fields"]["FNAME"] = first_name
    @new_user["merge_fields"]["LNAME"] = last_name

    response = self.class.post('/lists/' + list_id + '/members', basic_auth: @auth, body: @new_user.to_json)
  end


end