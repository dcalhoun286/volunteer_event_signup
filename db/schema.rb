# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_08_10_060059) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "event_organizer_enum", ["organizer", "shift_lead"]
  create_enum "registration_status_enum", ["confirmed", "pending", "cancelled", "no_show"]
  create_enum "two_factor_auth_type_enum", ["totp", "sms"]
  create_enum "user_role_enum", ["organizer", "shift_lead", "volunteer"]

  create_table "activities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.bigint "event_id", null: false
    t.jsonb "metadata", default: {}
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_activities_on_event_id"
  end

  create_table "event_organizers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "event_id", null: false
    t.enum "permissions", default: "shift_lead", enum_type: "event_organizer_enum"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["event_id", "user_id"], name: "index_event_organizers_on_event_id_and_user_id", unique: true
    t.index ["event_id"], name: "index_event_organizers_on_event_id"
    t.index ["user_id"], name: "index_event_organizers_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "created_by_id"
    t.text "description"
    t.datetime "end_date", null: false
    t.string "location"
    t.jsonb "metadata", default: {}
    t.string "name", null: false
    t.datetime "start_date", null: false
    t.datetime "updated_at", null: false
    t.index ["created_by_id"], name: "index_events_on_created_by_id"
  end

  create_table "oauth_credentials", force: :cascade do |t|
    t.string "access_token"
    t.datetime "created_at", null: false
    t.string "provider", null: false
    t.string "provider_uid", null: false
    t.string "refresh_token"
    t.datetime "token_expires_at"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id", "provider"], name: "index_oauth_credentials_on_user_id_and_provider", unique: true
    t.index ["user_id"], name: "index_oauth_credentials_on_user_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.bigint "activity_id", null: false
    t.integer "capacity", null: false
    t.datetime "created_at", null: false
    t.datetime "end_time", null: false
    t.string "location"
    t.jsonb "metadata", default: {}
    t.string "name", null: false
    t.bigint "shift_lead_id"
    t.datetime "start_time", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_shifts_on_activity_id"
    t.index ["shift_lead_id"], name: "index_shifts_on_shift_lead_id"
  end

  create_table "two_factor_auths", force: :cascade do |t|
    t.enum "auth_type", null: false, enum_type: "two_factor_auth_type_enum"
    t.jsonb "backup_codes", default: []
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.string "secret"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_two_factor_auths_on_user_id"
  end

  create_table "user_roles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.enum "role", null: false, enum_type: "user_role_enum"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id", "role"], name: "index_user_roles_on_user_id_and_role", unique: true
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "first_name"
    t.string "last_name"
    t.jsonb "metadata", default: {}
    t.string "password_digest", null: false
    t.string "phone"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "volunteer_registrations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.jsonb "metadata", default: {}
    t.datetime "registered_at", null: false
    t.bigint "shift_id", null: false
    t.enum "status", default: "pending", null: false, enum_type: "registration_status_enum"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["shift_id", "user_id"], name: "index_volunteer_registrations_on_shift_id_and_user_id", unique: true
    t.index ["shift_id"], name: "index_volunteer_registrations_on_shift_id"
    t.index ["user_id"], name: "index_volunteer_registrations_on_user_id"
  end

  add_foreign_key "activities", "events"
  add_foreign_key "event_organizers", "events"
  add_foreign_key "event_organizers", "users"
  add_foreign_key "events", "users", column: "created_by_id"
  add_foreign_key "oauth_credentials", "users"
  add_foreign_key "shifts", "activities"
  add_foreign_key "shifts", "users", column: "shift_lead_id"
  add_foreign_key "two_factor_auths", "users"
  add_foreign_key "user_roles", "users"
  add_foreign_key "volunteer_registrations", "shifts"
  add_foreign_key "volunteer_registrations", "users"
end
