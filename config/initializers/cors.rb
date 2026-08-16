# config/initializers/cors.rb

CORS_ORIGINS = {
  "development" => [ "localhost:3000", "localhost:3001", "127.0.0.1:3000", "127.0.0.1:3001" ],
  "production" => (ENV["CORS_ORIGINS"]&.split(",") || [ "yourdomain.com" ]),
  "test" => [ "localhost:3000" ]
}.freeze

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*(CORS_ORIGINS[Rails.env] || CORS_ORIGINS["development"]))
    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete ],
      credentials: true
  end
end
