WebsocketRails::EventMap.describe do
  subscribe(:player_entered,
    {:to => Api::V1::GameController, :with_method => :player_entered})
  subscribe(:player_exited,
    {:to => Api::V1::GameController, :with_method => :player_exited})
  subscribe(:player_moved,
    {:to => Api::V1::GameController, :with_method => :player_moved})
end
