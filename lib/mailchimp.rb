require 'httparty'

require './lib/mailchimp/'


class Mailchimp
  include HTTParty
  attr_accessor :lists, :campaigns

  def authorize
    client = OAuth2::Client.new('491000452870',
                                'f42b8b94d89b7cf50a81feaad3530c7d',
                                :site => 'https://login.mailchimp.com')
    client.options[:token_url] = "/oauth2/token"

    return client
  end


  


end