plains = Level.create(:name => 'Plains', :width => 640,  :height => 512)

imp       = Player.create(:name => 'Imp', :direction => 'down', :x => 0, :y => 0)
barbarian = Player.create(:name => 'Barbarian', :direction => 'down', :x => 0, :y => 0 )

SpriteSheet.create(:src => '/images/imp-walk.png', :state => 0,
  :number_states => 4, :tile_width => 32, :tile_height => 48,
  :player_id => imp.id)
SpriteSheet.create(:src => '/images/barbarian-walk.png', :state => 0,
  :number_states => 4, :tile_width => 32, :tile_height => 48,
  :player_id => barbarian.id)
