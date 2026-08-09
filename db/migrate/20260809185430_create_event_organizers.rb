class CreateEventOrganizers < ActiveRecord::Migration[8.1]
  def change
    create_enum :event_organizer_permission_enum, ["organizer", "shift_lead"], if_not_exists: true

    create_table :event_organizers do |t|
      t.references :event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.enum :permissions, enum_type: :event_organizer_permission_enum, default: "shift_lead", null: false

      t.timestamps
    end

    add_index :event_organizers, [:event_id, :user_id], unique: true
  end
end
