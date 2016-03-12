module Mailchimp

  def self.client(site)
    if Rails.env == "development"
      client = OAuth2::Client.new('908200191566',
                                  'ae7ee8904a4a650521de1a88bbf35de8',
                                  :site => site, :raise_errors => true)
    else
      client = OAuth2::Client.new('399304833589',
                                  '55f26460d3d708d322bd45989b17e46e',
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