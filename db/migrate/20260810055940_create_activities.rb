class CreateActivities < ActiveRecord::Migration[8.1]
  def change
    create_table :activities do |t|
      t.references :event, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.jsonb :metadata, default: {}

      t.timestamps
    end
  end
end
