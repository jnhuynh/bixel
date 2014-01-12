export default DS.Model.extend({
  name:       DS.attr('string'),
  width:      DS.attr('number'),
  height:     DS.attr('number'),

  players:    DS.hasMany('player'),

  payload: function() {
    return {
      id: this.get('id')
    };
  }.property()
});
