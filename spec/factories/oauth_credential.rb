FactoryBot.define do
    factory :oauth_credential do
        user { association :user }
        provider { "google" }
        provider_uid { Faker::Internet.uuid }
        access_token { Faker::Internet.password }
        refresh_token { Faker::Internet.password }
        token_expires_at { 1.hour.from_now }
    end
end
