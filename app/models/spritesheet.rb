# == Schema Information
#
# Table name: spritesheets
#
#  id                   :integer          not null, primary key
#  name                 :string(255)
#  src                  :string(255)
#  width                :integer
#  height               :integer
#  frame_width          :integer
#  frame_height         :integer
#  current_frame_column :integer
#  current_frame_row    :integer
#  frame_columns        :integer
#  frame_rows           :integer
#  player_id            :integer
#  created_at           :datetime
#  updated_at           :datetime
#

class Spritesheet < ActiveRecord::Base
  belongs_to(:player)
end
