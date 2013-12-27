class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :x
      t.integer :y
      t.string :name

      t.timestamps
    end
  end
end
