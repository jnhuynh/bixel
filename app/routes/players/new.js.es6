/**
 * "export" is ES6 keyword to export a module.
 * "module" is a file containing JS code.
 * "default" is a keyword that states we are exporting a class.
 *   In the code below, we are exporting an Ember.route that has been extended
 *   for the player router.
 */
export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('player');
  },

  deactivate: function() {
    var model = this.get('controller.model');

    /* Model wasn't saved prior to exit of this route. User doesn't care about
     * it. */
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  actions: {
    save: function() {
      var model = this.get('controller.model'),
          _this = this; /* Current 'this' to anonymous functions */

      /* Save and push to our backend. Method returns a promise. */
      model.save().then(function() {
        /* AJAX push to backend was successful, show created model. */
        _this.transitionTo('players.show', model);
      });
    },

    cancel: function() {
      /* Deactivate hook will clean up unsaved record. */
      this.transitionTo('players.index');
    }
  }
});
