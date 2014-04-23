require "faye/websocket"
require File.expand_path("../events/area", __FILE__)

class GameBackend
  # Needed to prevent Heroku Timeout
  KEEPALIVE_TIME = 15 # in seconds

  def initialize(app)
    @app     = app
    @clients = []
  end

  def call(env)
    # Create a new websocket if it is a websocket request.
    if Faye::WebSocket.websocket?(env)
      ws = Faye::WebSocket.new(env, nil, {ping: KEEPALIVE_TIME })

      ws.on :open do |event|
        p [:open, ws.object_id]
        @clients << ws
      end

      ws.on :message do |event|
        data       = JSON.parse(event.data)
        event_type = data["event"]
        payload    = {}

        case event_type
        when "game::player_enter"
          payload = Events::Area.player_enter
        when "game::player_exit"
          payload = Events::Area.player_exit
        when "game::player_move"
          payload = Events::Area.player_move
        when "player::create"
          payload = Events::Player.create
        end
      end

      ws.on :close do |event|
        p [:close, ws.object_id, event.code, event.reason]
        @clients.delete(ws)
        ws = nil
      end

      # Return async Rack response
      ws.rack_response
    else
      @app.call(env)
    end
  end
end
