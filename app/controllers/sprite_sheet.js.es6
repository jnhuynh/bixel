export default Ember.ObjectController.extend({
  transitionState: function() {
    var state        = this.get('state'),
        numberStates = this.get('numberStates'),
        newState     = (state + 1) % numberStates;

    this.set('state', newState);

    return newState;
  },

  keyFrameCoords: function(direction) {
    var state      = this.get('state'),
        tileWidth  = this.get('tileWidth'),
        tileHeight = this.get('tileHeight'),
        x          = state * tileWidth,
        y          = 0;

    switch(direction) {
      case 'up':
        y = tileHeight * 0;
        break;
      case 'down':
        y = tileHeight * 1;
        break;
      case 'left':
        y = tileHeight * 2;
        break;
      case 'right':
        y = tileHeight * 3;
        break;
    }
    return { x: x, y: y };
  },

  image: function() {
    var img = new Image();

    img.src = this.get('src');

    return img;
  }.property('src')
});
