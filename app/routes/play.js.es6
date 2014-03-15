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

    setupController: function(controller, model) {
        var selectionMenuController = this.controllerFor("selection_menu"),
            selectedPlayer          = selectionMenuController.get("selectedPlayer"),
            selectedArea            = selectionMenuController.get("selectedArea");

        controller.set("area", selectedArea);
        controller.set("player", selectedPlayer);
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
