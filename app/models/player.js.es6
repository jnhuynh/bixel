export default DS.Model.extend({
  name:       DS.attr('string'),
  x:          DS.attr('number'),
  y:          DS.attr('number'),
  updatedAt:  DS.attr('date'),

  level:      DS.belongsTo('level'),

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
