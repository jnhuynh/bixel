class SpriteSheetSerializer < ActiveModel::Serializer
  embed(:id)

  attributes(:id, :src, :state, :number_states, :tile_size)
  has_one(:player)
end
