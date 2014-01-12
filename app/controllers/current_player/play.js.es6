export default Ember.Controller.extend({
  needs: 'currentLevel currentPlayer'.w(),

  currentLevel:   Ember.computed.alias('controllers.currentLevel'),
  currentPlayer:  Ember.computed.alias('controllers.currentPlayer')
});
