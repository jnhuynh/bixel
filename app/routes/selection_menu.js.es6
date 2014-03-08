var SelectionMenuRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        var players = this.store.find("player"),
            areas   = this.store.find("area");

        controller.set("players", players);
        controller.set("areas", areas);
    },

    actions: {
        startGame: function() {
            var controller     = this.get("controller"),
                selectedArea   = controller.get("selectedArea"),
                selectedPlayer = controller.get("selectedPlayer");

            if (!!selectedArea && !!selectedPlayer) {
                this.transitionTo("play");
            }
        }
    }
});

export default SelectionMenuRoute;
