require 'rails_helper'

RSpec.describe TwoFactorAuth, type: :model do
  describe "assocations" do
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    subject { build(:two_factor_auth) }
    it { is_expected.to validate_presence_of(:auth_type) }
  end
end
