CarrierWave.configure do |config|
  config.fog_credentials = {
      :provider               => 'AWS',                        # required
      :aws_access_key_id      => 'AKIAIQV6NEAVXECUJSGA',                        # required
      :aws_secret_access_key  => '9thfN/hRzHuIq/rzWhi0u+FF154i7JRb3/ZQc/fL',
      # :host                   => 's3.example.com',    # required

      # :region                 => 'us-east-1',                  # optional, defaults to 'us-east-1'
      #     :host                   => 'https://chronicleme.bucket.s3-website-us-east-1.amazonaws.com',             # optional, defaults to nil
      #      :endpoint               => 'https://chronicleme.bucket.s3-website-us-east-1.amazonaws.com' # optional, defaults to nil
  }
  config.fog_directory  = 'voluapp'                     # required



  # config.asset_host = 'https://d11u0iim4znyam.cloudfront.net/'
  # config.fog_public     = false                                   # optional, defaults to true
  # config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}

end