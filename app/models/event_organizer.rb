class EventOrganizer < ApplicationRecord
    enum :role, { organizer: "organizer", shift_lead: "shift_lead" }, prefix: true

    belongs_to :event
    belongs_to :user

    validates :role, presence: true
end
