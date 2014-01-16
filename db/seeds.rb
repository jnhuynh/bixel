plains = Level.create(:name => 'Plains', :width => 640,  :height => 512)

night_elf = Player.create(:name => 'Night Elf', :direction => 'down', :x => 0, :y => 0)
barbarian = Player.create(:name => 'Barbarian', :direction => 'down', :x => 0, :y => 0 )

SpriteSheet.create(:src => '/images/night-elf-walk.png', :state => 0,
  :number_states => 4, :tile_width => 32, :tile_height => 48,
  :player_id => night_elf.id)
SpriteSheet.create(:src => '/images/barbarian-walk.png', :state => 0,
  :number_states => 4, :tile_width => 32, :tile_height => 48,
  :player_id => barbarian.id)
