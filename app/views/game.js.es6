export default Ember.View.extend({
  templateName: 'game',
  classNames: 'panel panel-default'.w(),

  calcCoord: function(direction, x, y, minX, minY, maxX, maxY) {
    switch(direction) {
      case 'up':
        y = (y - 1) < minY ? minY : (y - 1);
        break;
      case 'down':
        y = (y + 1) > maxY ? maxY : (y + 1);
        break;
      case 'left':
        x = (x - 1) < minY ? minY : (x - 1);
        break;
      case 'right':
        x = (x + 1) > maxY ? maxY : (x + 1);
        break;
    }

    return { x: x, y: y };
  },

  keyDown: function(event) {
    var direction = '',
        player    = this.get('player'),
        level     = this.get('level'),
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

    coord = this.calcCoord(direction, player.get('x'), player.get('y'), 0, 0,
              level.get('width'), level.get('height'));

    player.set('x', coord.x);
    player.set('y', coord.y);

    player.save();

    return;
  }
});
