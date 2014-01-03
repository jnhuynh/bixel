export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('player', params.player_id);
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('levels', this.store.find('level'));

    return;
  },

  actions: {
    enterLevel: function(level) {
      var currentPlayer = this.get('currentModel'),
          _this         = this;

      level.get('players').pushObject(currentPlayer);

      level.save().then(function() {
        currentPlayer.set('level', level);
        return currentPlayer.save();
      }).then(function() {
        _this.transitionTo('levels.play', level);
        return;
      });

      return;
    },

    destroyRecord: function() {
      var model = this.get('controller.model'),
          _this = this;

      /**
       * It destroys the model in local storage and returns a promise. Promise
       * is fulfill when backend returns a response. It expects the response to
       * have code 204.
       */
      model.destroyRecord().then(function() {
        _this.transitionTo('players.index');
      });
    }
  }
});
