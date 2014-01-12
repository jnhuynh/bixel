export default Ember.Route.extend({
  dispatcher:         null,
  updateChannel:      null,
  updateFromPayload:  function() {
    var _this = this;

    return function(jsonString) {
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

      // TODO: Move each of these into a generatePayload model method.
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

          spriteSheet.tileSize = spriteSheet.tile_size;
          delete spriteSheet.tile_size;

          _this.store.push('spriteSheet', spriteSheet);
        });
      }

      return;
    };
  }.property(),

  activate: function() {
    var level             = this.modelFor('level'),
        player            = this.modelFor('player'),
        dispatcher        = new WebSocketRails('localhost:3000/websocket'),
        updateChannel     = dispatcher.subscribe('level' + level.get('id')),
        updateFromPayload = this.get('updateFromPayload'),
        data              = null;

    this.set('dispatcher', dispatcher);
    this.set('updateChannel', updateChannel);

    updateChannel.bind('updated', updateFromPayload);

    level.get('players').pushObject(player);
    data = {
      level: {
        id: level.get('id')
      },
      player: {
        id: player.get('id')
      }
    };
    dispatcher.trigger('player_entered', data);

    return;
  },

  deactivate: function() {
    var level      = this.modelFor('level'),
        dispatcher = this.get('dispatcher');

    dispatcher.unsubscribe('level' + level.get('id'));

    this.set('dispatcher', null);
    this.set('updateChannel', null);

    return;
  },

  setupController: function(controller, model) {
    var level         = this.modelFor('level'),
        player        = this.modelFor('player'),
        dispatcher    = this.get('dispatcher'),
        updateChannel = this.get('updateChannel');

    controller.set('currentLevel', level);
    controller.set('currentPlayer', player);
    controller.set('dispatcher', dispatcher);
    controller.set('updateChannel', updateChannel);

    return;
  },

  actions: {
    exitGame: function() {
      var level         = this.controller.get('currentLevel'),
          currentPlayer = this.controller.get('currentPlayer'),
          dispatcher    = this.get('dispatcher'),
          data          = null;

      level.get('players').removeObject(currentPlayer);

      data = {
        level: {
          id: level.get('id')
        },
        player: {
          id: currentPlayer.get('id')
        }
      };
      dispatcher.trigger('player_exited', data);

      this.transitionTo('players.show', currentPlayer);
      return;
    }
  }
});
