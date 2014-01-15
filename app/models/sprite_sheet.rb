# == Schema Information
#
# Table name: sprite_sheets
#
#  id            :integer          not null, primary key
#  src           :string(255)
#  state         :integer
#  number_states :integer
#  player_id     :integer
#  created_at    :datetime
#  updated_at    :datetime
#  tile_width    :integer          default(0)
#  tile_height   :integer          default(0)
#

class SpriteSheet < ActiveRecord::Base
  belongs_to :player
end
