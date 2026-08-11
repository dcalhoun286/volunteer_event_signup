require 'rails_helper'

RSpec.describe EventOrganizer, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:event) }
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    subject { build(:event_organizer) }

    it { is_expected.to validate_presence_of(:role) }
  end
end
