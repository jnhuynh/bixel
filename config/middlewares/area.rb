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
          p [:open, ws.object_id]
          @clients << ws
        end

        ws.on :message do |event|
          p [:event, event.data]

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
