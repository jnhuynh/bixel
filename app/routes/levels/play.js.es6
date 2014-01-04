export default Ember.Route.extend({
  beforeModel: function() {
    if (typeof(this.controllerFor('players.show')) === 'undefined') {
      this.transitionTo('players.index');
    }

    return;
  },

  pollerDelay:       25,
  pollerIntervalID:  null,
  poller: function() {
    var _this = this;

    var _poller = function() {
      var url = '/api/v1/levels/' + _this.get('controller.model.id');

      jQuery.ajax(url).then(function(data) {
        /**
         * Normalize the JSON's for DS.Store.push and sideload all of the players
         * associated.
         */
        data.level.players = data.level.player_ids;
        delete data.level.player_ids;

        _this.store.push('level', data.level);

        data.players.forEach(function(player) {
          player.level = player.level_id;
          delete player.level_id;

          _this.store.push('player', player);
        });
      });
      return;
    };

    return _poller;
  },

  deactivate: function() {
    var pollerIntervalID = this.get('pollerIntervalID');

    window.clearInterval(pollerIntervalID);

    return;
  },

  model: function(params) {
    return this.store.find('level', params.level_id);
  },

  setupController: function(controller, model) {
    var currentPlayer    = this.modelFor('players.show'),
        poller           = this.poller(),
        pollerDelay      = this.pollerDelay,
        pollerIntervalID = null;

    controller.set('model', model);
    controller.set('currentPlayer', currentPlayer);

    pollerIntervalID = window.setInterval(poller, pollerDelay);
    this.set('pollerIntervalID', pollerIntervalID);

    return;
  },

  actions: {
    exitLevel: function(player) {
      var level = this.get('currentModel'),
          _this = this;

      level.get('players').removeObject(player);

      level.save().then(function() {
        player.set('level', null);
        return player.save();
      }).then(function() {
        _this.transitionTo('players.show', player);
        return;
      });

      return;
    }
  }
});
