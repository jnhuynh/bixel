# == Schema Information
#
# Table name: players
#
#  id         :integer          not null, primary key
#  x          :integer
#  y          :integer
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  level_id   :integer
#

class Player < ActiveRecord::Base
  belongs_to(:level)
end
