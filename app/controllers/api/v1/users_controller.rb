module Api
    module V1
        class UsersController < ApplicationController
            skip_before_action :authenticate_request, only: [:create, :login]

            def create
                user = User.new(user_params)
                if user.save
                    token = JsonWebToken.encode(user_id: user.id)
                    cookies.encrypted[:auth_token] = {
                        value: token,
                        httponly: true,
                        secure: Rails.env.production?,
                        same_site: Rails.env.production? ? :strict : :lax,
                        domain: cookie_domain,
                        expires: 1.hour.from_now
                    }
                    render json: { success: true }, status: :created
                else
                    render json: { errors: user.errors.full_messages }, status: :unprocessable_content
                end
            end

            def login
                user = User.find_by(email: login_params[:email])
                if user&.authenticate(login_params[:password])
                    token = JsonWebToken.encode(user_id: user.id)
                    cookies.encrypted[:auth_token] = {
                        value: token,
                        httponly: true,
                        secure: Rails.env.production?,
                        same_site: Rails.env.production? ? :strict : :lax,
                        domain: cookie_domain,
                        expires: 1.hour.from_now
                    }
                    render json: { success: true }, status: :ok
                else
                    render json: { error: "Incorrect username and/or password" }, status: :unauthorized
                end
            end

            def logout
                if @current_user
                    cookies.delete(:auth_token)
                    render json: { success: true }, status: :ok
                else
                    render json: { error: "Unauthorized" }, status: :unauthorized
                end
            end

            private

            def user_params
                params.require(:user)
                    .permit(
                        :email,
                        :password,
                        :password_confirmation,
                        :first_name,
                        :last_name,
                        :phone
                    )
            end

            def login_params
                params.require(:user).permit(:email, :password)
            end

            def cookie_domain
                case Rails.env
                when "development"
                    "localhost"
                when "production"
                    ENV["COOKIE_DOMAIN"] || "yourdomain.com"
                end
            end
        end
    end
end
