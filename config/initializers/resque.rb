if Rails.rails_env == 'production'
  Resque.redis = "45.55.137.193:6379"
end
