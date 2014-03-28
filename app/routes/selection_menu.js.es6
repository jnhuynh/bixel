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
                selectedArea.get("players").pushObject(selectedPlayer);
                selectedArea.save().then(function() {
                  selectedPlayer.set("area", selectedArea);
                  return selectedPlayer.save();
                }).then(function() {
                  this.transitionTo("play");
                }.bind(this));
            }
        }
    }
});

export default SelectionMenuRoute;
