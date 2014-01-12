import PlayerController from 'app/controllers/player';

export default PlayerController.extend({
  needs: 'currentLevel'.w(),

  currentLevel: Ember.computed.alias('controllers.currentLevel'),

  moved: false,
  adjustYNegative: function() {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileSize             = this.get('spriteSheet.tileSize'),
        stepSize             = 8,
        originalY            = this.get('y'),
        originalX            = this.get('x'),
        newY                 = originalY - stepSize,
        collision            = null;

    if (currentLevel.isInsideLevel(originalX, newY)) {
      this.set('y', newY);

      collision = currentLevelEntities.filter(function(entity) {
        return _this.hasCollision(entity);
      }).get('firstObject');

      if (collision) {
        this.set('y', collision.get('y') + collision.get('tileSize'));
      }
    } else {
      this.set('y', 0);
    }

    return;
  },
  adjustYPositive: function() {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileSize             = this.get('spriteSheet.tileSize'),
        stepSize             = 8,
        originalY            = this.get('y'),
        originalX            = this.get('x'),
        newY                 = originalY + stepSize,
        collision            = null;

    if (currentLevel.isInsideLevel(originalX, newY + tileSize)) {
      this.set('y', newY);

      collision = currentLevelEntities.filter(function(entity) {
        return _this.hasCollision(entity);
      }).get('firstObject');

      if (collision) {
        this.set('y', collision.get('y') - tileSize);
      }
    } else {
      this.set('y', currentLevel.get('height') - tileSize);
    }

    return;
  },
  adjustXNegative: function() {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileSize             = this.get('spriteSheet.tileSize'),
        stepSize             = 8,
        originalY            = this.get('y'),
        originalX            = this.get('x'),
        newX                 = originalX - stepSize,
        collision            = null;

    if (currentLevel.isInsideLevel(newX, originalY)) {
      this.set('x', newX);

      collision = currentLevelEntities.filter(function(entity) {
        return _this.hasCollision(entity);
      }).get('firstObject');

      if (collision) {
        this.set('x', collision.get('x') + collision.get('tileSize'));
      }
    } else {
      this.set('x', 0);
    }

    return;
  },
  adjustXPositive: function() {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileSize             = this.get('spriteSheet.tileSize'),
        stepSize             = 8,
        originalY            = this.get('y'),
        originalX            = this.get('x'),
        newX                 = originalX + stepSize,
        collision            = null;

    if (currentLevel.isInsideLevel(newX + tileSize, originalY)) {
      this.set('x', newX);

      collision = currentLevelEntities.filter(function(entity) {
        return _this.hasCollision(entity);
      }).get('firstObject');

      if (collision) {
        this.set('x', collision.get('x') - tileSize);
      }
    } else {
      this.set('x', currentLevel.get('width') - tileSize);
    }

    return;
  },
  move: function(direction) {
    switch(direction) {
      case 'up':
        this.adjustYNegative();
        break;
      case 'down':
        this.adjustYPositive();
        break;
      case 'left':
        this.adjustXNegative();
        break;
      case 'right':
        this.adjustXPositive();
        break;
    }

    this.set('direction', direction);
    this.set('moved', true);

    return;
  }
});
