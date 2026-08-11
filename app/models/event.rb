class Event < ApplicationRecord
    belongs_to :created_by, class_name: "User", foreign_key: :created_by_id
    has_many :activities, dependent: :destroy
    has_many :event_organizers, dependent: :destroy

    validates :name, presence: true
    validates :start_date, presence: true
end
