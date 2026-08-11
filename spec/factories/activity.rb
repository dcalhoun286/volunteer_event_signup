FactoryBot.define do
    factory :activity do
        event { association :event }
        name { Faker::Job.title }
        description { Faker::Lorem.sentence }
    end
end
