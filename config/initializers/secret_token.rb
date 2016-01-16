# Be sure to restart your server when you modify this file.

# Your secret key for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.

# Although this is not needed for an api-only application, rails4 
# requires secret_key_base or secret_token to be defined, otherwise an 
# error is raised.
# Using secret_token for rails3 compatibility. Change to secret_key_base
# to avoid deprecation warning.
# Can be safely removed in a rails3 api-only application.
VoluntrApi::Application.config.secret_token =
    if Rails.env.development? or Rails.env.test?
    'a624bb2a9d6882cc7d300b9c783e53bcf55919b990721af197f33f167b391db5e95c02c46a845d123123b37f2cb5f9bed7abbf7ce535c3335ee48139a2650e49'
    else
      ENV['SECRET_TOKEN']       
    end

