export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('level');
  },

  deactivate: function() {
    var model = this.get('controller.model');

    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  actions: {
    save: function() {
      var model = this.get('controller.model'),
          _this = this;

      model.save().then(function() {
        _this.transitionTo('levels.show', model)
      });
    },

    cancel: function() {
      this.transitionTo('levels.index');
    }
  }
});
