class AreaSerializer < ActiveModel::Serializer
  attributes(:id, :name, :width, :height)

  embed(:ids, :include => true)
  has_many(:players, :key => :players)
end
