# == Schema Information
#
# Table name: sprite_sheets
#
#  id            :integer          not null, primary key
#  src           :string(255)
#  state         :integer
#  number_states :integer
#  tile_size     :integer
#  player_id     :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class SpriteSheet < ActiveRecord::Base
  belongs_to :player
end
