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

  calcCoord: function(direction, x, y, tileSize, minX, minY, maxX, maxY) {
    switch(direction) {
      case 'up':
        y = (y - tileSize) < minY ? minY : (y - tileSize);
        break;
      case 'down':
        y = (y + tileSize) > maxY ? maxY : (y + tileSize);
        break;
      case 'left':
        x = (x - tileSize) < minY ? minY : (x - tileSize);
        break;
      case 'right':
        x = (x + tileSize) > maxY ? maxY : (x + tileSize);
        break;
    }

    return { x: x, y: y };
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

    coord = this.calcCoord(direction, player.get('x'), player.get('y'),
      tileSize, 0, 0, level.get('width'), level.get('height')
    );

    player.set('x', coord.x);
    player.set('y', coord.y);

    player.save();

    return;
  }
});
