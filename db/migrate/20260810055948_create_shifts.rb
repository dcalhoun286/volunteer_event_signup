class CreateShifts < ActiveRecord::Migration[8.1]
  def change
    create_table :shifts do |t|
      t.references :activity, null: false, foreign_key: true
      t.string :name, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.integer :capacity, null: false
      t.references :shift_lead, foreign_key: { to_table: :users }
      t.string :location
      t.jsonb :metadata, default: {}

      t.timestamps
    end
  end
end
