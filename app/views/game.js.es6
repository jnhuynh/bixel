export default Ember.View.extend({
  templateName: 'game',
  classNames: 'panel panel-default'.w(),

  keyDown: function(event) {
    var direction = '';

    switch(event.which) {
      case 38:
      case 87:
        direction = 'up';
        break;
      case 37:
      case 65:
        direction = 'left';
        break;
      case 40:
      case 83:
        direction = 'down';
        break;
      case 39:
      case 68:
        direction = 'right';
        break;
    }

    return;
  }
});
