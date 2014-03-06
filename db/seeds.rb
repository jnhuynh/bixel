Area.create(:name => "Plains", :width => 640,  :height => 512)

night_elf = Player.create(:name => "Night Elf", :direction => "down",
  :x => 0, :y => 0)

barbarian = Player.create(:name => "Barbarian", :direction => "down",
  :x => 0, :y => 0 )

Spritesheet.create(:name => "Night Elf",
  :src => "/images/night-elf-walk.png",
  :width => 128, :height => 192,
  :frame_width => 32, :frame_height => 48,
  :frame_columns => 4, :frame_rows => 4,
  :current_frame_column => 0, :current_frame_row => 0,
  :player_id => night_elf.id)

Spritesheet.create(:name => "Barbarian",
  :src => "/images/barbarian-walk.png",
  :width => 128, :height => 192,
  :frame_width => 32, :frame_height => 48,
  :frame_columns => 4, :frame_rows => 4,
  :current_frame_column => 0, :current_frame_row => 0,
  :player_id => barbarian.id)
