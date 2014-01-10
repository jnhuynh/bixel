export default Ember.View.extend({
  templateName:  'game/render',
  classNames:    'game-render'.w(),

  width:   Ember.computed.alias('level.width'),
  height:  Ember.computed.alias('level.height'),

  level:          null,
  updateChannel:  null,

  canvas:           null,
  renderCtx:        null,
  renderCanvasCtx:  function() {
    var _this = this;

    return function() {
      var level         = _this.get('level'),
          width         = _this.get('width'),
          height        = _this.get('height'),
          renderCtx     = _this.get('renderCtx');

      renderCtx.clearRect(0, 0, width, height);

      level.get('entities').forEach(function(entity) {
        var x        = entity.get('x'),
            y        = entity.get('y'),
            tileSize = entity.get('tileSize');

        renderCtx.fillStype = '#000000';
        renderCtx.fillRect(x, y, tileSize, tileSize);
        entity.renderToCanvasCtx(renderCtx);
      });

      return;
    };
  }.property(),

  didInsertElement: function() {
    var canvas          = jQuery('.game-render canvas'),
        renderCtx       = canvas[0].getContext('2d'),
        renderCanvasCtx = this.get('renderCanvasCtx'),
        updateChannel   = this.get('updateChannel');

    canvas.attr('width', this.get('width'));
    canvas.attr('height', this.get('height'));
    canvas.attr('class', 'center-block panel panel-default');

    this.set('canvas', canvas);
    this.set('renderCtx', renderCtx);

    updateChannel.bind('updated', renderCanvasCtx);

    return;
  }
});
