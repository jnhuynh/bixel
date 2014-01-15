class AddTileWidthAndTileHeightToSpriteSheets < ActiveRecord::Migration
  def change
    add_column(:sprite_sheets, :tile_width, :integer, :default => 0)
    add_column(:sprite_sheets, :tile_height, :integer, :default => 0)
  end
end
