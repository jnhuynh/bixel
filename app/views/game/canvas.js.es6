export default Ember.View.extend({
  templateName:  'game/canvas',

  // Bindings set via view helper.
  level:         null,
  levelChannel:  null,

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
    var canvas            = jQuery('canvas.game-canvas'),
        canvasCtx         = canvas[0].getContext('2d'),
        canvasRender      = this.canvasRender(),
        levelChannel      = this.get('levelChannel');

    canvas.attr('width', this.get('canvasWidth'));
    canvas.attr('height', this.get('canvasHeight'));

    this.set('canvas', canvas);
    this.set('canvasCtx', canvasCtx);

    levelChannel.bind('updated', canvasRender);

    return;
  }
});
