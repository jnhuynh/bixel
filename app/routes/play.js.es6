var PlayRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        var players = this.store.find("player"),
            areas   = this.store.find("area");

        controller.set("players", players);
        controller.set("areas", areas);
    }
});

export default PlayRoute;
