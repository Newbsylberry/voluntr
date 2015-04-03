role :resque_worker, '45.55.137.193', user: 'voluser'
role :resque_schedule, '45.55.137.193', user: 'voluser'

set :workers, {"facebook_queue" => 1, "record_organization_hours_queue" => 1}

set :ssh_options, {
                    forward_agent: true
                }