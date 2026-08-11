class User < ApplicationRecord
    enum :role, { admin: "admin", volunteer: "volunteer" }, prefix: true

    has_secure_password

    validates :email, presence: true, uniqueness: true
    validates :password_digest, presence: true

    has_many :events, foreign_key: :created_by_id
    has_many :event_organizers, dependent: :destroy
    has_many :volunteer_shifts, foreign_key: :shift_lead_id
    has_many :volunteer_registrations, dependent: :destroy
    has_one :oauth_credential, dependent: :destroy
    has_one :two_factor_auth, dependent: :destroy
end
