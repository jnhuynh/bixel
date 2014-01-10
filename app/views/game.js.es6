export default Ember.View.extend({
  templateName:  'game',

  classNames:         'game-ui'.w(),
  attributeBindings:  'tabindex'.w(),
  tabindex:           0,

  dispatcher:     null,
  updateChannel:  null,
  currentPlayer:  null,
  level:          null,

  keyDown: function(event) {
    var dispatcher               = this.get('dispatcher'),
        level                    = this.get('level'),
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
          id: level.get('id')
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
