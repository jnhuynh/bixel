var PlayController = Ember.Controller.extend({
  player:     null,
  area:       null,
  webSocket:  null,

  messageSocket: function() {
    var webSocket  = this.get("webSocket");

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

export default PlayController;
