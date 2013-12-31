export default Ember.Route.extend({
  beforeModel: function() {
    if (typeof(this.controllerFor('players.show')) === 'undefined') {
      this.transitionTo('players.index');
    }

    return;
  },

  model: function(params) {
    return this.store.find('level', params.level_id);
  },

  setupController: function(controller, model) {
    var currentPlayer = this.controllerFor('players.show').get('model');

    controller.set('model', model);
    controller.set('currentPlayer', currentPlayer);

    return;
  },

  actions: {
    exitLevel: function(player) {
      var level = this.get('currentModel'),
          _this = this;

      level.get('players').removeObject(player);

      level.save().then(function() {
          player.set('level', null);

          player.save().then(function() {
            _this.transitionTo('players.show', player);
          });
      });

      return;
    }
  }
});
