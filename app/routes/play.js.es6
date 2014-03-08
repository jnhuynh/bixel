var PlayRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        var selectionMenuController = this.controllerFor("selection_menu"),
            selectedPlayer          = selectionMenuController.get("selectedPlayer"),
            selectedArea            = selectionMenuController.get("selectedArea");

        controller.set("area", selectedArea);
        controller.set("player", selectedPlayer);
    }
});

export default PlayRoute;
