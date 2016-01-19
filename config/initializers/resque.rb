require 'rake'
require 'resque/tasks'

if Rails.env == 'production' || Rails.env == 'staging'
  Resque.redis = "10.132.9.138:6379"
  Resque.logger = Logger.new("new_resque_log_file")
else
  Resque.redis = Redis.new(url: "redis://127.0.0.1:6379/0")
end




