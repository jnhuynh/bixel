# == Schema Information
#
# Table name: players
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  direction  :string(255)
#  x          :integer
#  y          :integer
#  level_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class Player < ActiveRecord::Base
  has_one :sprite_sheet
  belongs_to :level
end
