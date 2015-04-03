if ['RAILS_ENV'] == 'production'
  puts "cabbage cabbage"
  Resque.redis = "45.55.137.193:6379"
end
