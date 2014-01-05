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
        minX       = 0,
        minY       = 0,
        maxX       = level.get('width') - tileSize,
        maxY       = level.get('height') - tileSize,
        collisions = null;

    switch(direction) {
      case 'up':
        y = level.onLevel(y - tileSize, x, tileSize) ? (y - tileSize): y;
        break;
      case 'down':
        y = level.onLevel(y + tileSize, x, tileSize) ? (y + tileSize): y;
        break;
      case 'left':
        x = level.onLevel(y, x - tileSize, tileSize) ? (x - tileSize): x;
        break;
      case 'right':
        x = level.onLevel(y, x + tileSize, tileSize) ? (x + tileSize): x;
        break;
    }

    collisions = level.get('players').filter(function(p) {
      if (player.get('id') != p.get('id')) {
        return p.onPlayer(x, y, tileSize);
      } else {
        return false;
      }
    });

    if (collisions.get('length') > 0) {
      return { x: player.get('x'), y: player.get('y') };
    } else {
      return { x: x, y: y };
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
