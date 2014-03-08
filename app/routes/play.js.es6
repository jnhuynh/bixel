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
    }
});

export default PlayRoute;
