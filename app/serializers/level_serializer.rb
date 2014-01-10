class LevelSerializer < ActiveModel::Serializer
  embed(:id, :include => true)

  attributes(:id, :width, :height, :name)
  has_many(:players)
end
