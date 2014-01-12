export default Ember.ObjectController.extend({
  needs: 'players'.w(),

  players: Ember.computed.alias('controllers.players'),

  isInsideLevel: function(x, y) {
    var width  = this.get('width'),
        height = this.get('height');

    return (x >= 0) && (y >= 0) && (x <= width) && (y <= height);
  },

  entities: function() {
    return this.get('players');
  }.property()
});
