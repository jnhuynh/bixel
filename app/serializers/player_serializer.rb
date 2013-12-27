class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :x, :y, :name, :updated_at
end
