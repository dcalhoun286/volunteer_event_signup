class Activity < ApplicationRecord
    belongs_to :event
    has_many :volunteer_shifts, dependent: :destroy

    validates :name, presence: true
end
