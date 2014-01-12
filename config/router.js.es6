var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('currentLevel', {path: 'level/:level_id'}, function() {
    this.resource('currentPlayer', {path: 'player/:player_id'}, function() {
      this.route('play');
    });
  });

  this.resource('players', function() {
    this.route('show', {path: ':player_id'});
  });
});

export default Router;
