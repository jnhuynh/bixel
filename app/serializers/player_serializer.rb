class PlayerSerializer < ActiveModel::Serializer
  embed(:id, :include => true)

  attributes(:id, :name, :direction, :current_health, :max_health)
  attributes(:top_left_x, :top_left_y)

  has_one(:sprite_sheet)
  has_one(:level)
end
