FactoryBot.define do
    factory :event_organizer do
        event { association :event }
        user { association :user }
        role { "organizer" }
    end
end
