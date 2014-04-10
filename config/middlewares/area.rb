require "faye/websocket"
require "json"

module Bixel
  class AreaWebSocket
    KEEPALIVE_TIME = 15 # in seconds

    def initialize(app)
      @app     = app
      @clients = []
    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        ws = Faye::WebSocket.new(env, nil, { ping: KEEPALIVE_TIME })
        ws.on :open do |event|
          puts [:open, ws.object_id]
          @clients << ws
        end

        ws.on :message do |event|
          data = JSON.parse(event.data)

          if data["player"]
            id     = Integer(data["player"]["id"])
            player = Player.find(id)

            if player
              x = Integer(data["player"]["x"])
              y = Integer(data["player"]["y"])

              player.x = x
              player.y = y

              player.save
            end
          end

          @clients.each do |client|
            client.send(event.data)
          end
        end

        # Return async Rack response
        ws.rack_response
      else
        @app.call(env)
      end
    end
  end
end
