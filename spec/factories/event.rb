FactoryBot.define do
    factory :event do
        name { Faker::Company.name }
        description { Faker::Lorem.sentence }
        start_date { 1.week.from_now }
        end_date { 1.week.from_now + 3.hours }
        location { Faker::Address.city }
        timezone { "UTC" }
        created_by { association :user }
    end
end
