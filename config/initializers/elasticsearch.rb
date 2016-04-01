if Rails.env == 'production' || Rails.env == 'staging'
  Elasticsearch::Model.client = Elasticsearch::Client.new host: '10.132.3.99', log: true
elsif Rails.env == 'development'
  Elasticsearch::Model.client = Elasticsearch::Client.new host: '0.0.0.0:9200', log: true
end