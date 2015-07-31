require 'rake'
require 'resque/tasks'

if Rails.env == 'production'
  Resque.redis = "45.55.137.193:6379"
  Resque.logger = Logger.new("new_resque_log_file")
else
  Resque.redis = Redis.new(url: "redis://127.0.0.1:6379/0")
end




