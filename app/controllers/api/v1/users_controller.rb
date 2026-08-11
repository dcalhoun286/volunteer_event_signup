module Api
    module V1
        class UsersController < ApplicationController
            # skip_before action :authenticate_request, only: [:create, :login]

            def create
                user = User.new(user_params)
                if user.save
                    token = JsonWebToken.encode(user_id: user.id)
                    render json: { token: token }, status: :created
                else
                    render json: { errors: user.errors.full_messages }, status: :unprocessable_content
                end
            end

            def login
                user = User.find_by(email: login_params[:email])
                if user&.authenticate(login_params[:password])
                    token = JsonWebToken.encode(user_id: user.id)
                    render json: { token: token }, status: :ok
                else
                    render json: { error: "Incorrect username and/or password" }, status: :unauthorized
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
        end
    end
end
