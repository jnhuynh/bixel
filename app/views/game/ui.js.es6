export default Ember.View.extend({
  templateName:  'game/ui',
  classNames:    'panel panel-default'.w(),

  // Bindings set via view helper.
  level:         null,
  levelChannel:  null,
  player:        null,

  tileSize: 32,

  canvas:        null,
  canvasWidth:   Ember.computed.alias('level.width'),
  canvasHeight:  Ember.computed.alias('level.height'),
  canvasCtx:     null,

  canvasRender: function() {
    var _this = this;

    var _canvasRender = function() {
      var level        = _this.get('level'),
          canvas       = _this.get('canvas'),
          canvasWidth  = _this.get('canvasWidth'),
          canvasHeight = _this.get('canvasHeight'),
          canvasCtx    = _this.get('canvasCtx'),
          tileSize     = _this.get('tileSize');

      // console.log(canvasCtx);
      // console.log('(' + player.get('x') + ',' + player.get('y') + ')');
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      // console.log(level.get('players.length'));
      level.get('players').forEach(function(player) {
        canvasCtx.fillStyle = '#000000';
        canvasCtx.fillRect(player.get('x'), player.get('y'), tileSize, tileSize);
      });

      return;
    };

    return _canvasRender;
  },

  didInsertElement: function() {
    var canvas            = jQuery('canvas.game'),
        canvasCtx         = canvas[0].getContext('2d'),
        canvasRender      = this.canvasRender(),
        levelChannel      = this.get('levelChannel');

    canvas.attr('width', this.get('canvasWidth'));
    canvas.attr('height', this.get('canvasHeight'));

    this.set('canvas', canvas);
    this.set('canvasCtx', canvasCtx);

    levelChannel.bind('updated', canvasRender);
  },

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
  },

  actions: {
    exitLevel: function(player) {
      this.get('controller').send('exitLevel', player);

      return;
    }
  }
});
