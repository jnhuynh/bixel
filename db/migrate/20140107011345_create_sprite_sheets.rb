class CreateSpriteSheets < ActiveRecord::Migration
  def change
    create_table :sprite_sheets do |t|
      t.string :src
      t.integer :state
      t.integer :number_states
      t.integer :tile_size
      t.integer :player_id

      t.timestamps
    end
  end
end
