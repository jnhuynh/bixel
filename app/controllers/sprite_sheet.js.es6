export default Ember.ObjectController.extend({
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

  image: function() {
    var img = new Image();

    img.src = this.get('src');

    return img;
  }.property('src')
});
