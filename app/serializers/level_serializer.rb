class LevelSerializer < ActiveModel::Serializer
  embed(:ids)

  attributes(:id, :width, :height, :name, :updated_at, :players)
  has_many(:players)
end
