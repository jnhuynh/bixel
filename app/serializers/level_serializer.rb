class LevelSerializer < ActiveModel::Serializer
  embed(:ids, :include => true)

  attributes(:id, :width, :height, :name, :updated_at)
  has_many(:players)
end
