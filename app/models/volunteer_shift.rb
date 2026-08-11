class VolunteerShift < ApplicationRecord
    self.table_name = "shifts"

    belongs_to :activity
    belongs_to :shift_lead, class_name: "User", foreign_key: :shift_lead_id, optional: true
    has_many :volunteer_registrations, foreign_key: :shift_id, dependent: :destroy

    validates :name, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
    validates :capacity, presence: true
end
