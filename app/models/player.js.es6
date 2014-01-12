// TODO: Move a bunch of methods to PlayerController
export default DS.Model.extend({
  name:       DS.attr('string'),
  direction:  DS.attr('string'),
  x:          DS.attr('number'),
  y:          DS.attr('number'),

  currentHealth:  DS.attr('number'),
  maxHealth:      DS.attr('number'),

  level:        DS.belongsTo('level'),
  spriteSheet:  DS.belongsTo('spriteSheet'),

  tileSize: function() {
    var spriteSheet = this.get('spriteSheet');

    if (spriteSheet) {
      return spriteSheet.get('tileSize');
    } else {
      return 0;
    }
  }.property('spriteSheet'),

  renderToCanvasCtx: function(canvasCtx) {
    var x                 = this.get('x'),
        y                 = this.get('y'),
        tileSize          = this.get('tileSize'),
        spriteSheet       = this.get('spriteSheet'),
        spriteSheetImage  = spriteSheet.get('image'),
        spriteSheetCoords = spriteSheet.keyFrameCoords(this.get('direction'));

    canvasCtx.drawImage(spriteSheetImage,
      spriteSheetCoords.x, spriteSheetCoords.y, tileSize, tileSize,
      x, y, tileSize, tileSize);

    return;
  },

  moved: false,
  move: function(direction) {
    var _this         = this,
        level         = this.get('level'),
        levelEntities = this.get('level.entities'),
        tileSize      = this.get('spriteSheet.tileSize'),
        stepSize      = 8,
        y             = this.get('y'),
        x             = this.get('x'),
        collision     = null;

    this.set('direction', direction);
    this.set('moved', true);

    switch(direction) {
      case 'up':
        y = y - stepSize;
        if (level.isInsideLevel(x, y)) {
          this.set('y', y);

          collision = levelEntities.filter(function(entity) {
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
        if (level.isInsideLevel(x, y + tileSize)) {
          this.set('y', y);

          collision = levelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('y', collision.get('y') - tileSize);
          }
        } else {
          this.set('y', level.get('height') - tileSize);
        }
        break;
      case 'left':
        x = x - stepSize;
        if (level.isInsideLevel(x, y)) {
          this.set('x', x);

          collision = levelEntities.filter(function(entity) {
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
        if (level.isInsideLevel(x + tileSize, y)) {
          this.set('x', x);

          collision = levelEntities.filter(function(entity) {
            return _this.hasCollision(entity);
          }).get('firstObject');

          if (collision) {
            this.set('x', collision.get('x') - tileSize);
          }
        } else {
          this.set('x', level.get('width') - tileSize);
        }
        break;
    }

    return;
  },

  hasCollision: function(entity) {
    var x              = this.get('x'),
        y              = this.get('y'),
        tileSize       = this.get('tileSize'),
        entityX        = entity.get('x'),
        entityY        = entity.get('y'),
        entityTileSize = entity.get('tileSize'),
        xCollision     = false,
        yCollision     = false;

    if (this === entity) {
      return false;
    } else {
      if (x < entityX) {
        xCollision = ((entityX - x) < tileSize);
      } else {
        xCollision = ((x - entityX) < entityTileSize);
      }

      if (y < entityY) {
        yCollision = ((entityY - y) < tileSize);
      } else {
        yCollision = ((y - entityY) < entityTileSize);
      }
      return (xCollision && yCollision);
    }
  }
});
