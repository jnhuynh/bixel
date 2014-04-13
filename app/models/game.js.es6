var attr      = DS.attr,
    hasMany   = DS.hasMany,
    belongsTo = DS.belongsTo;

var Game = DS.Model.extend({
  area:      belongsTo("area"),
  player:    belongsTo("player"),
  entities:  hasMany("entity"),

  store:      null,
  webSocket:  null,

  openWebSocket: function() {
    var scheme = "ws://",
        uri    = scheme + window.document.location.host + "/";

    var webSocket = new WebSocket(uri);

    webSocket.onopen = function() {
      console.log("Opening web socket");
    };

    webSocket.onmessage = function(message) {
      var data                = JSON.parse(message.data),
          store               = this.get("store"),
          player              = this.get("player"),
          playerPayload       = { player: data.player },
          playerId            = playerPayload.player.id.toString(10),
          spritesheetsPayload = data.spritesheets;

      if (playerId !== player.get("id")) {
        store.pushPayload("player", playerPayload);

        spritesheetsPayload.forEach(function(spritesheet) {
          var spritesheetPayload = { spritesheet: spritesheet };

          store.pushPayload("spritesheet", spritesheetPayload);
        }.bind(store));
      }
    }.bind(this);

    webSocket.onclose = function() {
      console.log("Closing web socket");
    };

    this.set("webSocket", webSocket);

    return webSocket;
  },

  closeWebSocket: function() {
    var webSocket = this.get("webSocket");
    webSocket.close();
    this.set("webSocket", null);
  },

  messageSocket: function() {
    var webSocket = this.get("webSocket");

    if (webSocket) {
      var readyState = webSocket.readyState,
          connecting = (readyState === 0),
          closing    = (readyState > 1);

      if (!!webSocket && !connecting && !closing) {
        var player             = this.get("player"),
            id                 = player.get("id"),
            x                  = player.get("x"),
            y                  = player.get("y"),
            spritesheet        = player.get("spritesheet"),
            spritesheetId      = spritesheet.get("id"),
            currentFrameRow    = spritesheet.get("currentFrameRow"),
            currentFrameColumn = spritesheet.get("currentFrameColumn");

        var jsonString = JSON.stringify({
          player: {
            id: id,
            x: x,
            y: y
          },

          spritesheet: {
            id:                    spritesheetId,
            current_frame_column:  currentFrameColumn,
            current_frame_row:     currentFrameRow
          }
        });

        webSocket.send(jsonString);
      }
    }
  }.observes("player.x", "player.y")
});

export default Game;
