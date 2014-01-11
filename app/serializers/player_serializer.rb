class PlayerSerializer < ActiveModel::Serializer
  embed(:id, :include => true)

  attributes(:id, :name, :direction, :x, :y, :current_health, :max_health)
  has_one(:sprite_sheet)
  has_one(:level)
end
