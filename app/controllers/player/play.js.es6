export default Ember.Controller.extend({
  needs: 'level player'.w(),

  currentLevel:   Ember.computed.alias('controllers.level'),
  currentPlayer:  Ember.computed.alias('controllers.player'),

  hi: function() {debugger;}.property()

});
