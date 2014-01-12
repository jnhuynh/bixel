export default Ember.ObjectController.extend({
  isInsideLevel: function(x, y) {
    var width  = this.get('model.width'),
        height = this.get('model.height');

    return (x >= 0) && (y >= 0) && (x <= width) && (y <= height);
  },

  entities: function() {
    return this.get('model.players');
  }.property()
});
