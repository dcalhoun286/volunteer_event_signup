class CreateVolunteerRegistrations < ActiveRecord::Migration[8.1]
  def change
    create_enum :registration_status_enum, ["confirmed", "pending", "cancelled", "no_show"], if_not_exists: true

    create_table :volunteer_registrations do |t|
      t.references :shift, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.enum :status, enum_type: :registration_status_enum, default: "pending", null: false
      t.datetime :registered_at, null: false
      t.text :notes
      t.jsonb :metadata, default: {}

      t.timestamps
    end

    add_index :volunteer_registrations, [:shift_id, :user_id], unique: true
  end
end
