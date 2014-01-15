class RemoveTileSizeFromSpriteSheets < ActiveRecord::Migration
  def change
    remove_column(:sprite_sheets, :tile_size, :integer)
  end
end
