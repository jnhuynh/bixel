export default Ember.Route.extend({
  dispatcher:         null,
  updateChannel:      null,
  updateFromPayload:  function() {
    var _this = this;

    var _updateFromPayload = function(jsonString) {
      /**
       * Normalize the JSON's for DS.Store.push and sideload all associations.
       *
       * The ID is a key named id (an ID is mandatory)
       * The names of attributes are the ones you used in your model's DS.attrs.
       * Your relationships must be:
       *   represented as IDs or Arrays of IDs
       *   represented as model instances
       *   represented as URLs, under the links key
       */
      var data = JSON.parse(jsonString);

      // console.log('pushing payload: ' + jsonString);
      if (data.level) {
        data.level.players = data.level.player_ids;
        delete data.level.player_ids;

        _this.store.push('level', data.level);
      }

      if (data.players) {
        data.players.forEach(function(player) {
          player.level = player.level_id;
          delete player.level_id;

          player.currentHealth = player.current_health;
          delete player.current_health;

          player.maxHealth = player.max_health;
          delete player.max_health;

          player.spriteSheet = player.sprite_sheet_id;
          delete player.sprite_sheet_id;

          _this.store.push('player', player);
        });
      }

      if (data.sprite_sheets) {
        data.sprite_sheets.forEach(function(spriteSheet) {
          spriteSheet.player = spriteSheet.player_id;
          delete spriteSheet.player_id;

          spriteSheet.numberStates = spriteSheet.number_states;
          delete spriteSheet.number_states;

          spriteSheet.tileWidth  = spriteSheet.tile_width;
          spriteSheet.tileHeight = spriteSheet.tile_height;
          delete spriteSheet.tile_width;
          delete spriteSheet.tile_height;

          _this.store.push('spriteSheet', spriteSheet);
        });
      }

      return;
    };

    return _updateFromPayload;
  }.property(),

  activate: function() {
    var currentLevel      = this.controllerFor('currentLevel'),
        currentPlayer     = this.controllerFor('currentPlayer'),
        dispatcher        = new WebSocketRails('localhost:3000/websocket'),
        updateChannel     = dispatcher.subscribe('level' + currentLevel.get('id')),
        updateFromPayload = this.get('updateFromPayload'),
        data              = null;

    this.set('dispatcher', dispatcher);
    this.set('updateChannel', updateChannel);

    updateChannel.bind('updated', updateFromPayload);

    currentLevel.get('players.model').pushObject(currentPlayer.get('model'));
    data = {
      level: {
        id: currentLevel.get('id')
      },
      player: {
        id: currentPlayer.get('id')
      }
    };
    dispatcher.trigger('player_entered', data);

    return;
  },

  deactivate: function() {
    var currentLevel = this.controllerFor('currentLevel'),
        dispatcher   = this.get('dispatcher');

    dispatcher.unsubscribe('level' + currentLevel.get('id'));

    this.set('dispatcher', null);
    this.set('updateChannel', null);

    return;
  },

  setupController: function(controller, model) {
    var dispatcher    = this.get('dispatcher'),
        updateChannel = this.get('updateChannel');

    controller.set('dispatcher', dispatcher);
    controller.set('updateChannel', updateChannel);

    return;
  },

  actions: {
    exitGame: function() {
      var currentLevel  = this.controller.get('currentLevel'),
          currentPlayer = this.controller.get('currentPlayer'),
          dispatcher    = this.get('dispatcher'),
          data          = null;

      currentLevel.get('players.model').removeObject(currentPlayer.get('model'));

      data = {
        level:   currentLevel.get('payload'),
        player:  currentPlayer.get('payload')
      };
      dispatcher.trigger('player_exited', data);

      this.transitionTo('players.show', currentPlayer.get('model'));
      return;
    }
  }
});
