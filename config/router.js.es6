var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('players', function() {
    this.route('new');
    this.route('show', {path: ':player_id'});
  });

  this.resource('levels', function() {
  });
});

export default Router;
