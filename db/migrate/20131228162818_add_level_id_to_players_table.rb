class AddLevelIdToPlayersTable < ActiveRecord::Migration
  def change
    add_column(:players, :level_id, :integer)
  end
end
