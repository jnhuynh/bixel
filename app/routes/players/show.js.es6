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
        return currentPlayer.save();
      }).then(function() {
        /**
         * Ember data has a that does not set 'isDirty' to true when a OneToMany
         * relationship is updated.
         *
         * We still use 'DS.Model.save' to push to our backend. 'DS.Store.push'
         * is used to explicitly overwrite of our front end data store because
         * the 'DS.Model.save' will null out our updated association after the
         * each 'DS.Model.save'.
         *
         * THIS IS AN ABSOLUTE HACK. I hope Ember will fix this in the future.
         */
        level.get('players').pushObject(currentPlayer);
        _this.store.push('level', level.get('payload'));
        _this.store.push('player', currentPlayer.get('payload'));

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
