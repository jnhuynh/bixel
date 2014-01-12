import SpriteSheetController from 'app/controllers/sprite-sheet'

export default Ember.ObjectController.extend({
  spriteSheet: function() {
    var playerSpriteSheet = this.get('model.spriteSheet');

    return SpriteSheetController.create({
      model: playerSpriteSheet
    });
  }.property('model'),

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

  hasCollision: function(entity) {
    var x              = this.get('x'),
        y              = this.get('y'),
        tileSize       = this.get('tileSize'),
        entityX        = entity.get('x'),
        entityY        = entity.get('y'),
        entityTileSize = entity.get('tileSize'),
        xCollision     = false,
        yCollision     = false;

    if (this.get('content') === entity.get('content')) {
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
