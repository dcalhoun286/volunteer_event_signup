class CreateUserRoles < ActiveRecord::Migration[8.1]
  def change
    create_enum :user_role_enum, [ "organizer", "shift_lead", "volunteer" ], if_not_exists: true

    create_table :user_roles do |t|
      t.references :user, null: false, foreign_key: true
      t.enum :role, enum_type: :user_role_enum, null: false

      t.timestamps
    end

    add_index :user_roles, [ :user_id, :role ], unique: true
  end
end
