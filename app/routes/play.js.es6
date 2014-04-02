var PlayRoute = Ember.Route.extend({
  afterModel: function(transition) {
    var selectionMenuController = this.controllerFor("selection_menu"),
      selectedPlayer,
      selectedArea;

    if (selectionMenuController) {
      selectedPlayer = selectionMenuController.get("selectedPlayer");
      selectedArea   = selectionMenuController.get("selectedArea");

      if (!selectedArea && !selectedPlayer) {
        this.transitionTo("selection_menu");
      }
    } else {
      this.transitionTo("selection_menu");
    }
  },

  webSocket: null,

  setupWebSocket: function() {
    var scheme = "ws://",
        uri    = scheme + window.document.location.host + "/";

    var webSocket = new WebSocket(uri);

    webSocket.onopen = function() {
      console.log("Opening");
    };

    webSocket.onmessage = function(message) {
      console.log(message);
    };

    webSocket.onclose = function() {
      console.log("Closing");
    };

    return webSocket;
  },

  deactivate: function() {
    var webSocket = this.get("webSocket");
    webSocket.close();
    this.set("webSocket", null);
  },

  setupController: function(controller, model) {
    var selectionMenuController = this.controllerFor("selection_menu"),
        selectedPlayer          = selectionMenuController.get("selectedPlayer"),
        selectedArea            = selectionMenuController.get("selectedArea"),
        webSocket               = this.setupWebSocket();

    controller.set("area", selectedArea);
    controller.set("player", selectedPlayer);

    this.set("webSocket", webSocket);
    controller.set("webSocket", webSocket);
  },

  actions: {
    exitGame: function() {
      var controller              = this.get("controller"),
          selectionMenuController = this.controllerFor("selection_menu"),
          player                  = controller.get("player"),
          area                    = controller.get("area");

      area.get("players").removeObject(player);
      area.save();

      selectionMenuController.set("selectedArea", null);
      selectionMenuController.set("selectedPlayer", null);

      this.transitionTo("selection_menu");
    }
  }
});

export default PlayRoute;
