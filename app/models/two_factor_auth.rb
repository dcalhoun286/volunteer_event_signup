class TwoFactorAuth < ApplicationRecord
    enum :auth_type, { totp: "totp", sms: "sms" }, prefix: true

    belongs_to :user

    validates :auth_type, presence: true
end
