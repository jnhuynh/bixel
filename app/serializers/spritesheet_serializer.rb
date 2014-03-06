class SpritesheetSerializer < ActiveModel::Serializer
  attributes :id, :name, :src, :width, :height, :frame_width, :frame_height, :current_frame_column, :current_frame_row, :frame_columns, :frame_rows, :player_id
end
