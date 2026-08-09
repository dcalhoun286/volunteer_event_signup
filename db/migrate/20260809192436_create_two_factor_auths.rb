class CreateTwoFactorAuths < ActiveRecord::Migration[8.1]
  def change
    create_enum :two_factor_auth_type_enum, ["totp", "sms"], if_not_exists: true

    create_table :two_factor_auths do |t|
      t.references :user, null: false, foreign_key: true
      t.enum :auth_type, enum_type: :two_factor_auth_type_enum, null: false
      t.string :secret
      t.boolean :confirmed, default: false
      t.jsonb :backup_codes, default: []

      t.timestamps
    end
  end
end
