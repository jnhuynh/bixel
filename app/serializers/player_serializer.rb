class PlayerSerializer < ActiveModel::Serializer
  embed(:id, :include => true)

  attributes(:id, :name, :direction, :x, :y)
  has_one(:sprite_sheet)
  has_one(:level)
end
