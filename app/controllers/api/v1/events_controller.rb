module Api
    module V1
        class EventsController < ApplicationController
            before_action :set_event, only: [ :show, :update, :destroy ]
            before_action :authorize_organizer, only: [ :update, :destroy ]

            def index
                events = Event.all
                render json: events, status: :ok
            end

            def show
                render json: @event, status: :ok
            end

            def create
                unless @current_user.admin?
                    render json: { error: "Only admins can create events" }, status: :unauthorized
                end

                event = Event.new(event_params)
                event.created_by_id = @current_user.id
                if event.save
                    render json: event, status: :created
                else
                    render json: { errors: event.errors.full_messages }, status: :unprocessable_content
                end
            end

            def update
                if @event.update(event_params)
                    render json: @event, status: :ok
                else
                    render json: { errors: @event.errors.full_messages }, status: :unprocessable_content
                end
            end

            def destroy
                @event.destroy
                render json: { success: true }, status: :ok
            end

            private

            def authorize_organizer
                unless @current_user&.admin?
                    render json: { error: "Unauthorized" }, status: :unauthorized
                end
            end

            def set_event
                @event = Event.find(params[:id])
            rescue ActiveRecord::RecordNotFound
                render json: { error: "Event not found" }, status: :not_found
            end

            def event_params
                params.require(:event).permit(:name, :description, :start_date, :end_date, :location)
            end
        end
    end
end
