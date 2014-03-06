class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :x, :y, :area_id
end
