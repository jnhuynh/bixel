import PlayerController from 'app/controllers/player';

export default PlayerController.extend({
  needs: 'currentLevel'.w(),

  currentLevel: Ember.computed.alias('controllers.currentLevel'),

  moved: false,
  adjustY: function(cardinality) {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileWidth            = this.get('spriteSheet.tileWidth'),
        tileHeight           = this.get('spriteSheet.tileHeight'),
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
            this.set('y', collision.get('y') + collision.get('tileHeight'));
          }
        } else {
          this.set('y', 0);
        }
        break;
      case 'positive':
        newY = originalY + stepSize

        if (currentLevel.isInsideLevel(originalX, newY + tileHeight)) {
          this.set('y', newY);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('y', collision.get('y') - tileHeight);
          }
        } else {
          this.set('y', currentLevel.get('height') - tileHeight);
        }
        break;
    }

    return;
  },
  adjustX: function(cardinality) {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileWidth            = this.get('spriteSheet.tileWidth'),
        tileHeight           = this.get('spriteSheet.tileHeight'),
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
            this.set('x', collision.get('x') + collision.get('tileWidth'));
          }
        } else {
          this.set('X', 0);
        }
        break;
      case 'positive':
        newX = originalX + stepSize

        if (currentLevel.isInsideLevel(newX + tileWidth, originalY)) {
          this.set('x', newX);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('x', collision.get('x') - tileWidth);
          }
        } else {
          this.set('x', currentLevel.get('width') - tileWidth);
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
