if Rails.env == 'production'
  Elasticsearch::Model.client = Elasticsearch::Client.new host: '45.55.131.2', log: true
elsif Rails.env == 'development'
  Elasticsearch::Model.client = Elasticsearch::Client.new host: '0.0.0.0:9200', log: true
end