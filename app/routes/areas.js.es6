var AreasRoute = Ember.Route.extend({
    model: function() {
        return this.store.find("area");
    },

    setupController: function(controller, model) {
        controller.set("model", model);
    }
});

export default AreasRoute;
