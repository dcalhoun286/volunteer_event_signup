class CreateEvents < ActiveRecord::Migration[8.1]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.text :description
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.string :location
      t.references :created_by, foreign_key: { to_table: :users }
      t.jsonb :metadata, default: {}

      t.timestamps
    end
  end
end
