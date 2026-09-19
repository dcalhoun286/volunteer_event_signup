# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

if Rails.env.development?
    # Seed users
    volunteer_user = User.find_or_create_by!(email: "user1@example.test") do |user|
        user.password = "password!123"
        user.password_confirmation = "password!123"
        user.first_name = "John"
        user.last_name = "Doe"
        user.role = "volunteer"
    end

    admin_user = User.find_or_create_by!(email: "user2@example.test") do |user|
        user.password = "password!123"
        user.password_confirmation = "password!123"
        user.first_name = "Jane"
        user.last_name = "Doe"
        user.role = "admin"
    end

    # Seed events
    event1 = Event.find_or_create_by!(name: "Community Cleanup", created_by_id: admin_user.id) do |event|
        event.description = "Help clean up the local park"
        event.start_date = 1.week.from_now
        event.end_date = 1.week.from_now + 3.hours
        event.location = "Central Park"
        event.timezone = "America/New_York"
    end

    event2 = Event.find_or_create_by!(name: "Food Bank Drive", created_by_id: admin_user.id) do |event|
        event.description = "Volunteer at the local food bank"
        event.start_date = 2.weeks.from_now
        event.end_date = 2.weeks.from_now + 4.hours
        event.location = "Downtown NYC Food Bank"
        event.timezone = "America/New_York"
    end

    event3 = Event.find_or_create_by!(name: "Beach Cleanup", created_by_id: admin_user.id) do |event|
        event.description = "Clean up trash from the beach"
        event.start_date = 3.weeks.from_now
        event.end_date = 3.weeks.from_now + 5.hours
        event.location = "Cannon Beach"
        event.timezone = "America/Los_Angeles"
    end

    # Seed event organizers
    EventOrganizer.find_or_create_by!(event_id: event1.id, user_id: admin_user.id) do |eo|
        eo.role = "organizer"
    end

    EventOrganizer.find_or_create_by!(event_id: event2.id, user_id: admin_user.id) do |eo|
        eo.role = "organizer"
    end

    EventOrganizer.find_or_create_by!(event_id: event3.id, user_id: admin_user.id) do |eo|
        eo.role = "organizer"
    end
end
