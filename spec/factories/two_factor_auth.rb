FactoryBot.define do
    factory :two_factor_auth do
        user { association :user }
        auth_type { "totp" }
        secret { Faker::Internet.password(min_length: 32, max_length: 32) }
        confirmed { false }
    end
end
