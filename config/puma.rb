#!/usr/bin/env puma
if Rails.env == 'staging'
  env = 'staging'
elsif Rails.env == 'production'
  env = 'production'
end

directory '/home/voluser/apps/volu/current'
rackup '/home/voluser/apps/volu/current/config.ru'
environment env

pidfile '/home/voluser/apps/volu/shared/tmp/pids/puma.pid'
state_path '/home/voluser/apps/volu/shared/tmp/pids/puma.state'
stdout_redirect '/home/voluser/apps/volu/current/log/puma.error.log',
                '/home/voluser/apps/volu/current/log/puma.access.log', true


threads 1,4

bind 'unix:///home/voluser/apps/volu/shared/tmp/sockets/volu-puma.sock'