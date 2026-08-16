class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_request

  private

  def authenticate_request
    token = cookies.encrypted[:auth_token]

    begin
      decoded = JsonWebToken.decode(token)
      @current_user = User.find(decoded["user_id"])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
