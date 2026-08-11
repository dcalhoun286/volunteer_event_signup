FactoryBot.define do
    factory :volunteer_shift do
        activity { association :activity }
        shift_lead_id { association(:user).id }
        name { Faker::Job.title }
        start_time { 1.day.from_now }
        end_time { 1.day.from_now + 2.hours }
        capacity { rand(5..20) }
        location { Faker::Address.city }
    end
end
