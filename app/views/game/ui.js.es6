export default Ember.View.extend({
  templateName:  'game/ui',
  classNames:    'game-ui panel panel-default'.w(),

  attributeBindings:  'tabindex'.w(),
  tabindex: 0,

  // Bindings set via view helper.
  level:         null,
  levelChannel:  null,
  player:        null,

  tileSize: 32,

  calcCoord: function(direction) {
    var level      = this.get('level'),
        tileSize   = this.get('tileSize'),
        player     = this.get('player'),
        y          = player.get('y'),
        x          = player.get('x'),
        newY       = player.get('y'),
        newX       = player.get('x'),
        collisions = null;

    switch(direction) {
      case 'up':
        newY = y - tileSize;
        newX = x;
        break;
      case 'down':
        newY = y + tileSize;
        newX = x;
        break;
      case 'left':
        newY = y;
        newX = x - tileSize;
        break;
      case 'right':
        newY = y;
        newX = x + tileSize;
        break;
    }

    if (level.onLevel(newX, newY, tileSize)) {
      collisions = level.get('players').filter(function(p) {
        // Collect all players who occupy the space
        return (player.get('id') !== p.get('id') &&
          p.onPlayer(newX, newY, tileSize));
      });

      if (collisions.get('length') === 0) {
        // We are within bound of level and no player collisoin, we can move
        return { x: newX, y: newY };
      }
    } else {
      // We are cannot move outside of level boundaries
      return { x: player.get('x'), y: player.get('y') };
    }
  },

  keyDown: function(event) {
    var direction = '',
        player    = this.get('player'),
        level     = this.get('level'),
        tileSize  = this.get('tileSize'),
        coord     = null;

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

    coord = this.calcCoord(direction);

    player.set('x', coord.x);
    player.set('y', coord.y);

    player.save();

    return;
  }
});
