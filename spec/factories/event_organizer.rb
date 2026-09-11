FactoryBot.define do
    factory :event_organizer do
        event { association :event }
        user { association :user }
        role { "organizer" }

        trait :shift_lead do
            role { "shift_lead" }
        end

        trait :organizer do
            role { "organizer" }
        end
    end
end
