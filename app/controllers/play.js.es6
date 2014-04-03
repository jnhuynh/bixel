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
        var player = this.get("player"),
            id     = player.get("id"),
            x      = player.get("x"),
            y      = player.get("y");

        var jsonString = JSON.stringify({
          player: {
            id: id,
            x: x,
            y: y
          }
        });

        webSocket.send(jsonString);
      }
    }
  }.observes("player.x", "player.y")
});

export default PlayController;
