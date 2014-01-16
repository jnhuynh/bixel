class Api::V1::GameController < WebsocketRails::BaseController
  before_filter :find_level
  before_filter :find_player

  def initialize_session
    controller_store[:player_count] = 0
  end

  def player_entered
    puts("\n\nWebSocket => Api::V1::GameController#player_entered\n\n")

    if !@level.nil?
      @player.level = @level
      @player.save

      controller_store[:player_count] = @level.players.size

      channel_name = "level#{@level.id}".to_sym
      json         = @level.active_model_serializer.new(@level).to_json
      WebsocketRails[channel_name].trigger(:updated, json)
    end
  end

  def player_exited
    puts("\n\nWebSocket => Api::V1::GameController#player_exited\n\n")

    @player.level = nil
    @player.save

    controller_store[:player_count] = @level.players.size

    channel_name = "level#{@level.id}".to_sym
    json         = @level.active_model_serializer.new(@level).to_json
    WebsocketRails[channel_name].trigger(:updated, json)
  end

  def player_moved
    find_sprite_sheet

    puts("\n\nWebSocket => Api::V1::GameController#player_moved\n\n")

    @player.top_left_x     = message[:player][:top_left_x]
    @player.top_left_y     = message[:player][:top_left_y]
    @player.direction      = message[:player][:direction]
    @player.current_health = message[:player][:current_health]
    @player.save

    @sprite_sheet.state = message[:sprite_sheet][:state]
    @sprite_sheet.save

    channel_name = "level#{@level.id}".to_sym
    json         = @level.active_model_serializer.new(@level).to_json
    WebsocketRails[channel_name].trigger(:updated, json)
  end

  private
    def find_level
      @level = Level.find(message[:level][:id])
      puts("\n\nWebSocket => Api::V1::GameController#find_level #{@level.inspect}\n\n")
    end

    def find_player
      @player = Player.find(message[:player][:id])
      puts("\n\nWebSocket => Api::V1::GameController#find_player #{@player.inspect}\n\n")
    end

    def find_sprite_sheet
      @sprite_sheet = SpriteSheet.find(message[:sprite_sheet][:id])
      puts("\n\nWebSocket => Api::V1::GameController#find_sprite_sheet #{@sprite_sheet.inspect}\n\n")
    end
end
