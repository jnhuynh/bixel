export default DS.Model.extend({
  name:       DS.attr('string'),
  x:          DS.attr('number'),
  y:          DS.attr('number'),
  updatedAt:  DS.attr('date'),

  level:      DS.belongsTo('level'),

  onPlayer: function(x, y, tileSize) {
    var playerMinX = this.get('x'),
        playerMinY = this.get('y'),
        playerMaxX = playerMinX + tileSize,
        playerMaxY = playerMinY + tileSize,
        onPlayerX = (x >= playerMinX && x < playerMaxX),
        onPlayerY = (y >= playerMinY && y < playerMaxY);

    return ((onPlayerX && onPlayerY) ? true : false);
  },

  payload: function() {
    return {
      id:         this.get('id'),
      name:       this.get('name'),
      x:          this.get('x'),
      y:          this.get('y'),
      level:      this.get('level'),
      updatedAt:  this.get('updatedAt')
    };
  }.property().volatile(),
});
