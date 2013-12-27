export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('player', params.player_id);
  },

  actions: {
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
