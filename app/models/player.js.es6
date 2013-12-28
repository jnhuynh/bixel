export default DS.Model.extend({
  name:       DS.attr('string'),
  updatedAt:  DS.attr('date'),
  x:          DS.attr('number'),
  y:          DS.attr('number'),
  level:      DS.belongsTo('level')
});
