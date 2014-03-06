class SpritesheetSerializer < ActiveModel::Serializer
  attributes(:id, :name, :src, :width, :height,
    :frame_width, :frame_height, :frame_columns, :frame_rows,
    :current_frame_column, :current_frame_row)

  embed(:ids, :include => true)
  has_one(:player, :key => :player)
end
