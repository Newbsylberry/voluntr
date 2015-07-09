module Mailchimp

  def self.client(site)
    if Rails.env == "development"
      client = OAuth2::Client.new('135535067599',
                                  '8eee168235a9ae2c8a042e19ef176cfc',
                                  :site => site, :raise_errors => false)
    else
      client = OAuth2::Client.new('491000452870',
                                  'f42b8b94d89b7cf50a81feaad3530c7d',
                                  :site => site, :raise_errors => false)
    end

    client.options[:token_url] = "/oauth2/token"

    return client
  end

  def self.api(token)
    domain = token.split('-')[1]
    client = Mailchimp.client("https://#{domain}.api.mailchimp.com/3.0/")
    return OAuth2::AccessToken.new(client, token)
  end





end