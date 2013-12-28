export default Ember.Route.extend({
  model: function() {
    return this.store.find('level');
  },

  actions: {
    newLevel: function() {
      return this.transitionTo('levels.new');
    }
  }
});
