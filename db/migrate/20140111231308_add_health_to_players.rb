class AddHealthToPlayers < ActiveRecord::Migration
  def change
    add_column(:players, :current_health, :integer, :default => 100)
    add_column(:players, :max_health, :integer, :default => 100)
  end
end
