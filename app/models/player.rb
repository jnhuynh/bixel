# == Schema Information
#
# Table name: players
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  direction  :string(255)
#  x          :integer
#  y          :integer
#  area_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Player < ActiveRecord::Base
  belongs_to(:area)
  has_one(:spritesheet)
end
