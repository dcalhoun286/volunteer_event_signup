require 'rails_helper'

RSpec.describe Api::V1::UsersController do
  describe "#create" do
    context "with valid params" do
      let(:valid_params) do
        {
          user: {
            email: "test@example.com",
            password: "password123",
            password_confirmation: "password123",
            first_name: "John",
            last_name: "Doe"
          }
        }
      end

      it "creates a new user" do
        expect {
          post :create, params: valid_params
        }.to change(User, :count).by(1)
      end

      it "returns a token" do
        post :create, params: valid_params
        expect(JSON.parse(response.body)).to have_key("token")
      end

      it "returns 201 status" do
        post :create, params: valid_params
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid params" do
      let(:invalid_params) do
        {
          user: {
            email: "",
            password: "password123"
          }
        }
      end

      it "does not create a user" do
        expect {
          post :create, params: invalid_params
        }.not_to change(User, :count)
      end

      it "returns errors" do
        post :create, params: invalid_params
        expect(JSON.parse(response.body)).to have_key("errors")
      end

      it "returns 422 status" do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_content)
      end
    end
  end

  describe "#login" do
    let(:user) { create(:user, password_digest: BCrypt::Password.create("password123")) }

    context "with valid credentials" do
      let(:valid_params) do
        {
          user: {
            email: user.email,
            password: "password123"
          }
        }
      end

      it "returns a token" do
        post :login, params: valid_params
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid credentials" do
      let(:invalid_params) do
        {
          user: {
            email: user.email,
            password: "wrongpassword"
          }
        }
      end

      it "does not return a token" do
        post :login, params: invalid_params
        expect(JSON.parse(response.body)).not_to have_key("token")
      end

      it "returns 401 status" do
        post :login, params: invalid_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
