class RenameXAndYToTopLeftXAndYInPlayers < ActiveRecord::Migration
  def change
    rename_column(:players, :x, :top_left_x)
    rename_column(:players, :y, :top_left_y)
  end
end
