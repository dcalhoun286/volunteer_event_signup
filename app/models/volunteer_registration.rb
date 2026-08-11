class VolunteerRegistration < ApplicationRecord
    enum :status, { confirmed: "confirmed", pending: "pending", cancelled: "cancelled", no_show: "no_show" }, prefix: true

    belongs_to :volunteer_shift, foreign_key: :shift_id
    belongs_to :user

    validates :status, presence: true
    validates :registered_at, presence: true
end
