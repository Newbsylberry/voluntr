if Rails.env == 'production'
  Resque.redis = "45.55.137.193:6379"
  Resque.logger = Logger.new("new_resque_log_file")
end

