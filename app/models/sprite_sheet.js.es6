export default DS.Model.extend({
  src:           DS.attr('string'),
  state:         DS.attr('number'),
  numberStates:  DS.attr('number'),
  tileSize:      DS.attr('number'),

  player: DS.belongsTo('player'),

  payload: function() {
    return {
      id:     this.get('id'),
      state:  this.get('state')
    };
  }.property('state')
});
