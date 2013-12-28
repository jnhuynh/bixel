/**
 * "export" is ES6 keyword to export a module.
 * "module" is a file containing JS code.
 * "default" is a keyword that states we are exporting a class.
 *   In the code below, we are exporting an Ember.route that has been extended
 *   for the player router.
 */
export default Ember.Route.extend({
  model: function() {
    return this.store.find('player');
  },

  actions: {
    newPlayer: function() {
      return this.transitionTo('players.new');
    }
  }
});
