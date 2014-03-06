class CreateSpritesheets < ActiveRecord::Migration
  def change
    create_table :spritesheets do |t|
      t.string :name
      t.string :src
      t.integer :width
      t.integer :height
      t.integer :frame_width
      t.integer :frame_height
      t.integer :current_frame_column
      t.integer :current_frame_row
      t.integer :frame_columns
      t.integer :frame_rows
      t.integer :player_id

      t.timestamps
    end
  end
end
