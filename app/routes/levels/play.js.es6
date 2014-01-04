export default Ember.Route.extend({
  beforeModel: function() {
    if (typeof(this.controllerFor('players.show')) === 'undefined') {
      this.transitionTo('players.index');
    }

    return;
  },

  websocket:     null,
  levelChannel:  null,

  deactivate: function() {
    var level     = this.get('currentModel'),
        websocket = this.get('websocket');

    websocket.unsubscribe('level' + level.get('id'));

    this.set('websocket', null);
    this.set('levelChannel', null);

    return;
  },

  model: function(params) {
    return this.store.find('level', params.level_id);
  },

  setupController: function(controller, model) {
    var _this         = this,
        currentPlayer = this.modelFor('players.show'),
        websocket     = new WebSocketRails('localhost:3000/websocket'),
        levelChannel  = websocket.subscribe('level' + model.get('id'));

    controller.set('model', model);
    controller.set('currentPlayer', currentPlayer);
    controller.set('levelChannel', levelChannel);

    this.set('websocket', websocket);
    this.set('levelChannel', levelChannel);
    levelChannel.bind('updated', function(jsonString) {
      /**
       * Normalize the JSON's for DS.Store.push and sideload all of the players
       * associated.
       */
      var data = JSON.parse(jsonString);

      data.level.players = data.level.player_ids;
      delete data.level.player_ids;

      _this.store.push('level', data.level);

      data.players.forEach(function(player) {
        player.level = player.level_id;
        delete player.level_id;

        _this.store.push('player', player);
      });

      return;
    });

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
