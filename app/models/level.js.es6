export default DS.Model.extend({
  name:       DS.attr('string'),
  width:      DS.attr('number'),
  height:     DS.attr('number'),
  updatedAt:  DS.attr('date'),

  players:    DS.hasMany('player'),

  payload: function() {
    return {
      id:         this.get('id'),
      name:       this.get('name'),
      width:      this.get('width'),
      height:     this.get('height'),
      players:    this.get('players.arrangedContent'),
      updatedAt:  this.get('updatedAt')
    };
  }.property().volatile(),
});
