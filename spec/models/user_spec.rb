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
  end

  describe "has_secure_password" do
    let(:user) { build(:user, password: "password123") }

    it "authenticates with correct password" do
      user.save
      expect(user.authenticate("password123")).to eq(user)
    end

    it "failse authentication with wrong password" do
      user.save
      expect(user.authenticate("wrongpassword")).to be_falsey
    end
  end
end
