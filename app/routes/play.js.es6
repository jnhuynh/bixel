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

  deactivate: function() {
    var game = this.get("controller.game");

    game.closeWebSocket();
  },

  setupController: function(controller, model) {
    var selectionMenuController = this.controllerFor("selection_menu"),
        selectedPlayer          = selectionMenuController.get("selectedPlayer"),
        selectedArea            = selectionMenuController.get("selectedArea");

    var game = this.store.createRecord("game", {
      area:    selectedArea,
      player:  selectedPlayer,
      store:   this.store
    });

    game.openWebSocket();
    controller.set("game", game);
  },

  actions: {
    exitGame: function() {
      var controller              = this.get("controller"),
          selectionMenuController = this.controllerFor("selection_menu"),
          player                  = controller.get("game.player"),
          area                    = controller.get("game.area");

      area.get("players").removeObject(player);
      area.save();

      selectionMenuController.set("selectedArea", null);
      selectionMenuController.set("selectedPlayer", null);

      this.transitionTo("selection_menu");
    }
  }
});

export default PlayRoute;
