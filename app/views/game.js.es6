export default Ember.View.extend({
  templateName:  'game',
  classNames:    'game-container panel panel-default center-block'.w(),

  attributeBindings: 'style'.w(),

  style: function() {
    var width  = 'width:' + this.get('currentLevel.width') + 'px;',
        height = 'height:' + this.get('currentLevel.height') + 'px;';

    return width + height;
  }.property('currentLevel.width', 'currentLevel.height'),

  currentLevel: Ember.computed.alias('controller.currentLevel')
});
