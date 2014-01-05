export default DS.Model.extend({
  name:       DS.attr('string'),
  width:      DS.attr('number'),
  height:     DS.attr('number'),
  updatedAt:  DS.attr('date'),

  players:    DS.hasMany('player'),

  onLevel: function(x, y, tileSize) {
    var levelMinX = 0,
        levelMinY = 0,
        levelMaxX = this.get('width') - tileSize,
        levelMaxY = this.get('height') - tileSize,
        onLevelX = (x >= levelMinX && x <= levelMaxX),
        onLevelY = (y >= levelMinY && y <= levelMaxY);

    return ((onLevelX && onLevelY) ? true : false);
  },

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
