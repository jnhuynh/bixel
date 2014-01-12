export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('level', params.level_id);
  },

  setupController: function(controller, model) {
    var playersController = this.controllerFor('players');

    playersController.set('model', model.get('players'));
    controller.set('model', model);
  },
});
