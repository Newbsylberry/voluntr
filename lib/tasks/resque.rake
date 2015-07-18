require "resque/tasks"


task "resque:setup" => :environment do
  ENV['QUEUE'] = '*'
end

# namespace :resque do
#   task :setup do
#     require 'resque'
#
#     # you probably already have this somewhere
#     Resque.redis = '0.0.0.0:5678'
#   end

# end


