import PlayerController from 'app/controllers/player';

export default PlayerController.extend({
  needs: 'currentLevel'.w(),

  currentLevel: Ember.computed.alias('controllers.currentLevel'),

  moved: false,
  adjustY: function(cardinality) {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileWidth            = this.get('tileWidth'),
        tileHeight           = this.get('tileHeight'),
        stepSize             = 8,
        originalY            = this.get('topLeftY'),
        originalX            = this.get('topLeftX'),
        newY                 = null,
        collision            = null;

    switch(cardinality) {
      case 'negative':
        newY = originalY - stepSize;

        if (currentLevel.isInsideLevel(originalX, newY)) {
          this.set('topLeftY', newY);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('topLeftY',
              collision.get('topLeftY') + collision.get('tileHeight'));
          }
        } else {
          this.set('topLeftY', 0);
        }
        break;
      case 'positive':
        newY = originalY + stepSize;

        if (currentLevel.isInsideLevel(originalX, newY + tileHeight)) {
          this.set('topLeftY', newY);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('topLeftY', collision.get('topLeftY') - tileHeight);
          }
        } else {
          this.set('topLeftY', currentLevel.get('height') - tileHeight);
        }
        break;
    }

    return;
  },
  adjustX: function(cardinality) {
    var _this                = this,
        currentLevel         = this.get('currentLevel'),
        currentLevelEntities = this.get('currentLevel.entities'),
        tileWidth            = this.get('tileWidth'),
        tileHeight           = this.get('tileHeight'),
        stepSize             = 8,
        originalY            = this.get('topLeftY'),
        originalX            = this.get('topLeftX'),
        newX                 = null,
        collision            = null;

    switch(cardinality) {
      case 'negative':
        newX = originalX - stepSize;

        if (currentLevel.isInsideLevel(newX, originalY)) {
          this.set('topLeftX', newX);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('topLeftX',
              collision.get('topLeftX') + collision.get('tileWidth'));
          }
        } else {
          this.set('topLeftX', 0);
        }
        break;
      case 'positive':
        newX = originalX + stepSize;

        if (currentLevel.isInsideLevel(newX + tileWidth, originalY)) {
          this.set('topLeftX', newX);

          collision = currentLevelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('topLeftX', collision.get('topLeftX') - tileWidth);
          }
        } else {
          this.set('topLeftX', currentLevel.get('width') - tileWidth);
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
