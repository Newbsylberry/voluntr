set :stage, :production_resque

server '45.55.137.193', user: 'voluser'

role :resque_worker, '45.55.137.193'
role :resque_schedule, '45.55.137.193'

set :workers, {"facebook_queue" => 2, "record_organization_hours_queue" => 2}

set :ssh_options, {
                    forward_agent: true
                }