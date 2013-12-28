class LevelSerializer < ActiveModel::Serializer
  attributes(:id, :width, :height, :name, :updated_at, :players)
end
