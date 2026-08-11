require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:events).with_foreign_key("created_by_id") }
    it { is_expected.to have_many(:event_organizers).dependent(:destroy) }
    it { is_expected.to have_many(:volunteer_shifts).with_foreign_key("shift_lead_id") }
    it { is_expected.to have_many(:volunteer_registrations).dependent(:destroy) }
    it { is_expected.to have_one(:oauth_credential).dependent(:destroy) }
    it { is_expected.to have_one(:two_factor_auth).dependent(:destroy) }
  end

  describe "validations" do
    subject { build(:user) }

    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email) }
    it { is_expected.to validate_presence_of(:password_digest) }
  end
end
