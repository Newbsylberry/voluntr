module AuthToken
  # This issues the token, and is called when a user signs in or registers
  def AuthToken.issue_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  # This looks at the token
  def AuthToken.valid?(token)
    begin
      JWT.decode(token, Rails.application.secrets.secret_key_base)
    rescue
      false
    end
  end
end