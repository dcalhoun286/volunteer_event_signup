require 'rails_helper'

RSpec.describe Api::V1::EventsController do
  let(:admin_user) { create(:user, role: :admin) }
  let(:shift_lead_user) { create(:user) }
  let(:regular_user) { create(:user) }
  let(:event) { create(:event, created_by_id: admin_user.id) }

  def set_auth_cookie(user)
    token = Services::Auth::JsonWebToken.encode(user_id: user.id)
    cookies.encrypted[:auth_token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: Rails.env.production? ? :strict : :lax
    }
  end

  describe "#index" do
    before { set_auth_cookie(regular_user) }

    it "returns all events" do
      create_list(:event, 3)
      get :index
      expect(response).to have_http_status(:ok)
    end
  end

  describe "#show" do
    context "with valid event id" do
        before { set_auth_cookie(regular_user) }

      it "returns the event" do
        get :show, params: { id: event.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to have_key("id")
      end
    end

    context "with invalid event id" do
        before { set_auth_cookie(regular_user) }
      it "returns 404 status" do
        get :show, params: { id: 99999 }
        expect(response).to have_http_status(:not_found)
      end

      it "returns error message" do
        get :show, params: { id: 99999 }
        expect(JSON.parse(response.body)).to have_key("error")
      end
    end
  end

  describe "#create" do
    let(:valid_params) do
      {
        event: {
          name: "New Event",
          description: "A new event",
          start_date: 1.week.from_now,
          end_date: 1.week.from_now + 3.hours,
          timezone: "America/Los_Angeles",
          location: "Seattle"
        }
      }
    end

    context "when user is admin" do
        before { set_auth_cookie(admin_user) }
      it "creates a new event" do
        expect {
          post :create, params: valid_params
        }.to change(Event, :count).by(1)
      end

      it "returns 201 status" do
        post :create, params: valid_params
        expect(response).to have_http_status(:created)
      end

      it "returns success JSON" do
        post :create, params: valid_params
        expect(JSON.parse(response.body)).to have_key("id")
      end
    end

    context "when user is not admin" do
        before { set_auth_cookie(regular_user) }
      it "does not create an event" do
        expect {
          post :create, params: valid_params
        }.not_to change(Event, :count)
      end

      it "returns 401 status" do
        post :create, params: valid_params
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns error message" do
        post :create, params: valid_params
        expect(JSON.parse(response.body)).to have_key("error")
      end
    end
  end

  describe "#update" do
    let(:update_params) do
      {
        event: { name: "Updated Event" }
      }
    end

    context "when user is admin" do
        before { set_auth_cookie(admin_user) }

      it "updates the event" do
        patch :update, params: { id: event.id, **update_params }
        expect(response).to have_http_status(:ok)
      end

      it "returns updated event JSON" do
        patch :update, params: { id: event.id, **update_params }
        expect(JSON.parse(response.body)["name"]).to eq("Updated Event")
      end
    end

    context "when user is not admin" do
        before do
            create(:event_organizer, event: event, user: shift_lead_user, role: :shift_lead)
            set_auth_cookie(shift_lead_user)
        end

      it "returns 401 status" do
        patch :update, params: { id: event.id, **update_params }
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns error message" do
        patch :update, params: { id: event.id, **update_params }
        expect(JSON.parse(response.body)).to have_key("error")
      end
    end
  end

  describe "#destroy" do
    context "when user is admin" do
        before do
            set_auth_cookie(admin_user)
            event
        end

      it "deletes the event" do
        initial_count = Event.count
        delete :destroy, params: { id: event.id }
        expect(response).to have_http_status(:ok)
        expect(Event.exists?(event.id)).to be_falsey
        expect(Event.count).to eq(initial_count - 1)
      end

      it "returns 200 status" do
        delete :destroy, params: { id: event.id }
        expect(response).to have_http_status(:ok)
      end

      it "returns success JSON" do
        delete :destroy, params: { id: event.id }
        expect(JSON.parse(response.body)).to have_key("success")
      end
    end

    context "when user is not authorized" do
        before do
            create(:event_organizer, event: event, user: shift_lead_user, role: :shift_lead)
            set_auth_cookie(shift_lead_user)
            event
        end

      it "returns 401 status" do
        delete :destroy, params: { id: event.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
