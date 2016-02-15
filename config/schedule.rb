# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
job_type :runner, "{ cd #{@current_path} } && (export RACK_ENV=:environment; bundle exec rails runner :task :output"



every '30 9 22 * *' do
  runner "OpportunityWorker.perform_now"
end

every '00 00 * * *' do
  runner "DailyStatisticsWorker.perform_now"
end