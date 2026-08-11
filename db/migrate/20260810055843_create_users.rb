class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_enum :user_role_enum, [ "admin", "volunteer" ], if_not_exists: true

    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :phone
      t.enum :role, enum_type: :user_role_enum, default: "volunteer", null: false
      t.jsonb :metadata, default: {}

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
