#!/usr/bin/env puma

directory '/home/voluser/apps/volu/current'
rackup '/home/voluser/apps/volu/current/config.ru'
environment 'production'

pidfile '/home/voluser/apps/volu/shared/tmp/pids/puma.pid'
state_path '/home/voluser/apps/volu/shared/tmp/pids/puma.state'
stdout_redirect '/home/voluser/apps/volu/current/log/puma.error.log',
                '/home/voluser/apps/volu/current/log/puma.access.log', true


threads 0,16

bind 'unix:///home/volu/apps/volu/shared/tmp/sockets/volu-puma.sock'