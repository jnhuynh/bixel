// TODO: Move a bunch of methods to PlayerController
export default DS.Model.extend({
  name:       DS.attr('string'),
  direction:  DS.attr('string'),
  x:          DS.attr('number'),
  y:          DS.attr('number'),

  currentHealth:  DS.attr('number'),
  maxHealth:      DS.attr('number'),

  level:        DS.belongsTo('level'),
  spriteSheet:  DS.belongsTo('spriteSheet'),

  payload: function() {
    return {
      id:              this.get('id'),
      x:               this.get('x'),
      y:               this.get('y'),
      direction:       this.get('direction'),
      current_health:  this.get('currentHealth')
    };
  }.property('x', 'y', 'direction', 'currentHealth')
});
