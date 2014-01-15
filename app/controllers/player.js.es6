import SpriteSheetController from 'app/controllers/sprite-sheet'

export default Ember.ObjectController.extend({
  spriteSheet: function() {
    var playerSpriteSheet = this.get('model.spriteSheet');

    return SpriteSheetController.create({
      model: playerSpriteSheet
    });
  }.property('model'),

  tileWidth: function() {
    var spriteSheet = this.get('spriteSheet');

    if (spriteSheet) {
      return spriteSheet.get('tileWidth');
    } else {
      return 0;
    }
  }.property('spriteSheet'),

  tileHeight: function() {
    var spriteSheet = this.get('spriteSheet');

    if (spriteSheet) {
      return spriteSheet.get('tileHeight');
    } else {
      return 0;
    }
  }.property('spriteSheet'),

  renderToCanvasCtx: function(canvasCtx) {
    var x                 = this.get('x'),
        y                 = this.get('y'),
        tileWidth         = this.get('tileWidth'),
        tileHeight        = this.get('tileHeight'),
        spriteSheet       = this.get('spriteSheet'),
        spriteSheetImage  = spriteSheet.get('image'),
        spriteSheetCoords = spriteSheet.keyFrameCoords(this.get('direction'));

    canvasCtx.drawImage(spriteSheetImage,
      spriteSheetCoords.x, spriteSheetCoords.y, tileWidth, tileHeight,
      x, y, tileWidth, tileHeight);

    return;
  },

  hasCollision: function(entity) {
    var x                = this.get('x'),
        y                = this.get('y'),
        tileWidth        = this.get('tileWidth'),
        tileHeight       = this.get('tileHeight'),
        entityX          = entity.get('x'),
        entityY          = entity.get('y'),
        entityTileWidth  = entity.get('tileWidth'),
        entityTileHeight = entity.get('tileHeight'),
        xCollision       = false,
        yCollision       = false;

    if (this.get('content') === entity.get('content')) {
      return false;
    } else {
      if (x < entityX) {
        xCollision = ((entityX - x) < tileWidth);
      } else {
        xCollision = ((x - entityX) < entityTileWidth);
      }

      if (y < entityY) {
        yCollision = ((entityY - y) < tileHeight);
      } else {
        yCollision = ((y - entityY) < entityTileHeight);
      }

      return (xCollision && yCollision);
    }
  }
});
