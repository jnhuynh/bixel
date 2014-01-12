import PlayerController from 'app/controllers/player';

export default PlayerController.extend({
  needs: 'currentLevel'.w(),

  currentLevel: Ember.computed.alias('controllers.currentLevel'),

  moved: false,
  move: function(direction) {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileSize             = this.get('spriteSheet.tileSize'),
        stepSize             = 8,
        y                    = this.get('y'),
        x                    = this.get('x'),
        collision            = null;

    this.set('direction', direction);
    this.set('moved', true);

    switch(direction) {
      case 'up':
        y = y - stepSize;
        if (currentLevel.isInsideLevel(x, y)) {
          this.set('y', y);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('y', collision.get('y') + collision.get('tileSize'));
          }
        } else {
          this.set('y', 0);
        }
        break;
      case 'down':
        y = y + stepSize;
        if (currentLevel.isInsideLevel(x, y + tileSize)) {
          this.set('y', y);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('y', collision.get('y') - tileSize);
          }
        } else {
          this.set('y', currentLevel.get('height') - tileSize);
        }
        break;
      case 'left':
        x = x - stepSize;
        if (currentLevel.isInsideLevel(x, y)) {
          this.set('x', x);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('x', collision.get('x') + collision.get('tileSize'));
          }
        } else {
          this.set('x', 0);
        }
        break;
      case 'right':
        x = x + stepSize;
        if (currentLevel.isInsideLevel(x + tileSize, y)) {
          this.set('x', x);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('x', collision.get('x') - tileSize);
          }
        } else {
          this.set('x', currentLevel.get('width') - tileSize);
        }
        break;
    }

    return;
  }
});
