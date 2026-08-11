require 'rails_helper'

RSpec.describe Activity, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:event) }
    it { is_expected.to have_many(:volunteer_shifts).dependent(:destroy) }
  end

  describe "validations" do
    subject { build(:activity) }

    it { is_expected.to validate_presence_of(:name) }
  end
end
