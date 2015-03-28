#!/usr/bin/env puma

directory '/home/voluser/apps/volu/current'
rackup '/home/voluser/apps/volu/current/config.ru'
environment 'production'

pidfile '/home/volu/apps/voluser/shared/tmp/pids/puma.pid'
state_path '/home/volu/apps/voluser/shared/tmp/pids/puma.state'
stdout_redirect '/home/volu/apps/voluser/current/log/puma.error.log',
                '/home/volu/apps/voluser/current/log/puma.access.log', true


threads 0,16

bind 'unix:///home/volu/apps/voluser/shared/tmp/sockets/volu-puma.sock'