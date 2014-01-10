class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :direction
      t.integer :x
      t.integer :y
      t.integer :level_id

      t.timestamps
    end
  end
end
