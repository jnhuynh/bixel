export default Ember.View.extend({
  templateName:  'game',
  classNames:    'game-container panel panel-default center-block'.w(),

  attributeBindings: 'style'.w(),

  style: function() {
    var width  = 'width:' + this.get('currentLevel.width') + 'px;',
        height = 'height:' + this.get('currentLevel.height') + 'px;';

    return width + height;
  }.property('currentLevel.width', 'currentLevel.height'),

  dispatcher:     Ember.computed.alias('controller.dispatcher'),
  updateChannel:  Ember.computed.alias('controller.updateChannel'),
  currentLevel:   Ember.computed.alias('controller.currentLevel'),
  currentPlayer:  Ember.computed.alias('controller.currentPlayer'),

  currentPlayerMoved: function() {
    var dispatcher               = this.get('dispatcher'),
        currentLevel             = this.get('currentLevel'),
        currentPlayer            = this.get('currentPlayer'),
        currentPlayerSpriteSheet = this.get('currentPlayer.spriteSheet'),
        data                     = null;

    data = {
      level:         currentLevel.get('payload'),
      player:        currentPlayer.get('payload'),
      sprite_sheet:  currentPlayerSpriteSheet.get('payload')
    };

    dispatcher.trigger('player_moved', data);
    currentPlayer.set('moved', false);

    return;
  }.observes('controller.currentPlayer.moved')
});
