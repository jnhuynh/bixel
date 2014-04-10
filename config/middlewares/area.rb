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

            spritesheet_id = Integer(data["spritesheet"]["id"])
            spritesheet    = Spritesheet.find(spritesheet_id)

            if player && spritesheet
              x = Integer(data["player"]["x"])
              y = Integer(data["player"]["y"])

              player.x = x
              player.y = y
              player.save

              current_frame_row    = Integer(data["spritesheet"]["current_frame_row"])
              current_frame_column = Integer(data["spritesheet"]["current_frame_column"])

              spritesheet.current_frame_row    = current_frame_row
              spritesheet.current_frame_column = current_frame_column
              spritesheet.save

              response_payload = PlayerSerializer.new(player).to_json

              puts response_payload
              @clients.each do |client|
                client.send(response_payload)
              end
            end
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
