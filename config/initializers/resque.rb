if Rails.env.production?
  Resque.configure do |config|
    config.redis = "45.55.137.193:6379" # default localhost:6379
  end
end

# Resque::Plugins::Status::Hash.expire_in = (24 * 60 * 60) # 24hrs in seconds