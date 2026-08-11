class OauthCredential < ApplicationRecord
    belongs_to :user

    validates :provider, presence: true
    validates :provider_uid, presence: true
end
