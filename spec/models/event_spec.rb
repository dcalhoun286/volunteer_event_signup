require 'rails_helper'

RSpec.describe Event, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:created_by).class_name('User') }
    it { is_expected.to have_many(:activities).dependent(:destroy) }
    it { is_expected.to have_many(:event_organizers).dependent(:destroy) }
  end

  describe "validations" do
    subject { build(:event) }
    
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:start_date) }
  end
end
