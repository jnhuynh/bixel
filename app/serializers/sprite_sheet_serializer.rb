class SpriteSheetSerializer < ActiveModel::Serializer
  embed(:id)

  attributes(:id, :src, :state, :number_states, :tile_width, :tile_height)
  has_one(:player)
end
