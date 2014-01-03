class PlayerSerializer < ActiveModel::Serializer
  embed(:ids)

  attributes(:id, :x, :y, :name, :updated_at)
  has_one(:level)
end
