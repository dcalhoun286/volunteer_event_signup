require 'rails_helper'

RSpec.describe OauthCredential, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    subject { build(:oauth_credential) }

    it { is_expected.to validate_presence_of(:provider) }
    it { is_expected.to validate_presence_of(:provider_uid) }
  end
end
