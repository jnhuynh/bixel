var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('level', {path: 'level/:level_id'}, function() {
    this.resource('player', {path: 'player/:player_id'}, function() {
      this.route('play');
    });
  });

  this.resource('players', function() {
    this.route('show', {path: ':player_id'});
  });
});

export default Router;
