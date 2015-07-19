if Rails.env == 'production'
  Elasticsearch::Model.client = Elasticsearch::Client.new log: true
elsif Rails.env == 'development'
  Elasticsearch::Model.client = Elasticsearch::Client.new log: true
end