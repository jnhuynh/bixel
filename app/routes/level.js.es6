export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('level', params.level_id);
  }
});
