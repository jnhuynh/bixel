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
        webSocket.send(JSON.stringify({hi: "bye"}));
      }
    }
  }.observes("player.x", "player.y")
});

export default PlayController;
