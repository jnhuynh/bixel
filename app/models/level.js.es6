export default DS.Model.extend({
  name:       DS.attr('string'),
  width:      DS.attr('number'),
  height:     DS.attr('number'),

  players:    DS.hasMany('player'),

  isInsideLevel: function(x, y) {
    var width  = this.get('width'),
        height = this.get('height');

    return (x >= 0) && (y >= 0) && (x <= width) && (y <= height);
  },

  entities: function() {
    return this.get('players');
  }.property(),
});
