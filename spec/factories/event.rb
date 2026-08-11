FactoryBot.define do
    factory :event do
        name { Faker::Company.name }
        description { Faker::Lorem.sentence }
        start_date { 1.week.from_now }
        location { Faker::Address.city }
        created_by { association :user }
    end
end
