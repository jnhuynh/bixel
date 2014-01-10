export default DS.Model.extend({
  src:           DS.attr('string'),
  state:         DS.attr('number'),
  numberStates:  DS.attr('number'),
  tileSize:      DS.attr('number'),

  player: DS.belongsTo('player'),

  transitionState: function() {
    var state        = this.get('state'),
        numberStates = this.get('numberStates'),
        newState     = (state + 1) % numberStates;

    this.set('state', newState);

    return newState;
  },

  keyFrameCoords: function(direction) {
    var state    = this.get('state'),
        tileSize = this.get('tileSize'),
        x        = state * tileSize,
        y        = 0;

    switch(direction) {
      case 'up':
        y = tileSize * 0;
        break;
      case 'down':
        y = tileSize * 1;
        break;
      case 'left':
        y = tileSize * 2;
        break;
      case 'right':
        y = tileSize * 3;
        break;
    }
    return { x: x, y: y };
  },

  _image:  null,
  image:   function() {
    var _image = this.get('_image');

    if (!(_image)) {
      _image     = new Image();
      _image.src = this.get('src');
    }

    return _image;
  }.property('_image')
});
