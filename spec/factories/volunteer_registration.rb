FactoryBot.define do
    factory :volunteer_registration do
        association :volunteer_shift, factory: :volunteer_shift
        user { association :user }
        status { "pending" }
    end
end
