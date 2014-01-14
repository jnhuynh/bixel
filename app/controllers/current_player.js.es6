import PlayerController from 'app/controllers/player';

export default PlayerController.extend({
  needs: 'currentLevel'.w(),

  currentLevel: Ember.computed.alias('controllers.currentLevel'),

  moved: false,
  adjustY: function(cardinality) {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileSize             = this.get('spriteSheet.tileSize'),
        stepSize             = 8,
        originalY            = this.get('y'),
        originalX            = this.get('x'),
        newY                 = null,
        collision            = null;

    switch(cardinality) {
      case 'negative':
        newY = originalY - stepSize

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
        break;
      case 'positive':
        newY = originalY + stepSize

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
        break;
    }

    return;
  },
  adjustX: function(cardinality) {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileSize             = this.get('spriteSheet.tileSize'),
        stepSize             = 8,
        originalY            = this.get('y'),
        originalX            = this.get('x'),
        newX                 = null,
        collision            = null;

    switch(cardinality) {
      case 'negative':
        newX = originalX - stepSize

        if (currentLevel.isInsideLevel(newX, originalY)) {
          this.set('x', newX);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('x', collision.get('x') + collision.get('tileSize'));
          }
        } else {
          this.set('X', 0);
        }
        break;
      case 'positive':
        newX = originalX + stepSize

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
        break;
    }

    return;
  },
  move: function(direction) {
    switch(direction) {
      case 'up':
        this.adjustY('negative');
        break;
      case 'down':
        this.adjustY('positive');
        break;
      case 'left':
        this.adjustX('negative');
        break;
      case 'right':
        this.adjustX('positive');
        break;
    }

    this.set('direction', direction);
    this.set('moved', true);

    return;
  }
});
