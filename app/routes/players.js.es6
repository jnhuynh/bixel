var PlayersRoute = Ember.Route.extend({
    model: function() {
        return this.store.find("player");
    },

    setupController: function(controller, model) {
        controller.set("model", model);
    }
});

export default PlayersRoute;
