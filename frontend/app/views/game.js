var GameView = Ember.View.extend({
  game: null,

  preload: function () {
    return function () {
      this.game.load.image('sky', 'assets/sky.png');
      this.game.load.image('ground', 'assets/platform.png');
      this.game.load.image('star', 'assets/star.png');
      this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }.bind(this);
  }.property(),

  create: function () {
    return function () {
      this.game.load.image('sky', 'assets/sky.png');
      this.game.load.image('ground', 'assets/platform.png');
      this.game.load.image('star', 'assets/star.png');
      this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
      this.game.add.sprite(0, 0, 'star');
    }.bind(this);
  }.property(),

  update: function () {
  },

  didInsertElement: function() {
    var element = this.$();
    var game = new Phaser.Game(800, 600, Phaser.AUTO, element.attr("id"),
      { preload: this.get("preload"), create: this.get("create"), update: this.get("update") });

    this.set("game", game);
  }
});

export default GameView;
