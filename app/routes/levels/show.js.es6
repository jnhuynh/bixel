export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('level', params.level_id);
  },

  actions: {
    destroyRecord: function() {
      var model = this.get('controller.model'),
          _this = this;

      model.destroyRecord().then(function() {
        _this.transitionTo('levels.index');
      });
    }
  }
});
