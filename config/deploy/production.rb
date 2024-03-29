set :stage, :production
# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.



server '159.203.113.43', user: 'voluser', roles: %w{app}
server '159.203.113.43', user: 'voluser', roles: %w{web}
server '104.236.68.119', user: 'voluser', roles: %w{app}
server '104.236.68.119', user: 'voluser', roles: %w{web}
server '45.55.62.200', user: 'voluser', roles: %w{db}


role :resque_worker, '104.236.103.243', user: 'voluser'
set :workers, {"high_priority" => 4, "low_priority" => 2}

# set :whenever_roles, [:resque_worker]

set :ssh_options, {
                    forward_agent: true
                                    }

# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.




# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult[net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start).
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# And/or per server (overrides global)
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }
