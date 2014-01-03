class LevelSerializer < ActiveModel::Serializer
  embed(:ids)

  attributes(:id, :width, :height, :name, :updated_at)
  has_many(:players)
end
