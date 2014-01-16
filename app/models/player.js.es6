export default DS.Model.extend({
  name:  DS.attr('string'),

  direction:  DS.attr('string'),
  topLeftX:  DS.attr('number'),
  topLeftY:  DS.attr('number'),

  currentHealth:  DS.attr('number'),
  maxHealth:      DS.attr('number'),

  level:        DS.belongsTo('level'),
  spriteSheet:  DS.belongsTo('spriteSheet'),

  payload: function() {
    return {
      id:              this.get('id'),
      top_left_x:      this.get('topLeftX'),
      top_left_y:      this.get('topLeftY'),
      direction:       this.get('direction'),
      current_health:  this.get('currentHealth')
    };
  }.property('topLeftX', 'topLeftY', 'direction', 'currentHealth')
});
