export default Ember.View.extend({
  templateName:  'game/ui',

  classNames:         'game-ui'.w(),
  attributeBindings:  'tabindex style'.w(),

  tabindex:  0,
  style: function() {
    var width  = 'width:' + this.get('currentLevel.width') + 'px;',
        height = 'height:' + this.get('currentLevel.height') + 'px;';

    return width + height;
  }.property('currentLevel.width', 'currentLevel.height'),

  dispatcher:     Ember.computed.alias('controller.dispatcher'),
  updateChannel:  Ember.computed.alias('controller.updateChannel'),
  currentPlayer:  Ember.computed.alias('controller.currentPlayer'),
  currentLevel:   Ember.computed.alias('controller.currentLevel'),

  keyDown: function(event) {
    var dispatcher               = this.get('dispatcher'),
        currentLevel             = this.get('currentLevel'),
        currentPlayer            = this.get('currentPlayer'),
        currentPlayerSpriteSheet = currentPlayer.get('spriteSheet'),
        direction                = null,
        coord                    = null,
        data                     = null;

    switch(event.which) {
      case 38:
      case 87:
        direction = 'up';
        break;
      case 40:
      case 83:
        direction = 'down';
        break;
      case 37:
      case 65:
        direction = 'left';
        break;
      case 39:
      case 68:
        direction = 'right';
        break;
    }

    if (direction) {
      currentPlayer.move(direction);
      currentPlayerSpriteSheet.transitionState();

      data = {
        level: {
          id: currentLevel.get('id')
        },
        player: {
          id:         currentPlayer.get('id'),
          x:          currentPlayer.get('x'),
          y:          currentPlayer.get('y'),
          direction:  currentPlayer.get('direction')
        },
        sprite_sheet: {
          id:     currentPlayerSpriteSheet.get('id'),
          state:  currentPlayerSpriteSheet.get('state')
        }
      };

      dispatcher.trigger('player_moved', data);
    }

    return;
  }
});
