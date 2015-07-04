require './lib/mailchimp/'


module Mailchimp

  def self.client(site)
    client = OAuth2::Client.new('491000452870',
                                'f42b8b94d89b7cf50a81feaad3530c7d',
                                :site => site)
    client.options[:token_url] = "/oauth2/token"

    return client
  end

  def self.api(token)
    domain = token.split('-')[1]
    client = Mailchimp.client("https://#{domain}.api.mailchimp.com/3.0/")
    return OAuth2::AccessToken.new(client, token)
  end





end