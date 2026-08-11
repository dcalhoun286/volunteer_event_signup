require 'rails_helper'

RSpec.describe VolunteerShift, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:activity) }
    it { is_expected.to belong_to(:shift_lead).class_name("User").with_foreign_key("shift_lead_id").optional }
    it { is_expected.to have_many(:volunteer_registrations).dependent(:destroy) }
  end

  describe "validations" do
    subject { build(:volunteer_shift) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:start_time) }
    it { is_expected.to validate_presence_of(:end_time) }
    it { is_expected.to validate_presence_of(:capacity) }
  end
end
