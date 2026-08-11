require 'rails_helper'

RSpec.describe VolunteerRegistration, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:volunteer_shift).with_foreign_key("shift_id") }
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    subject { build(:volunteer_registration) }

    it { is_expected.to validate_presence_of(:status) }
    it { is_expected.to validate_presence_of(:registered_at) }
  end
end
