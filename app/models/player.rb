class Player < ActiveRecord::Base
  belongs_to(:area)
  has_one(:spritesheet)
end
