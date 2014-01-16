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

  bottomRightX: function() {
    return this.get('spriteSheet.tileWidth') + this.get('topLeftX');
  }.property('spriteSheet', 'topLeftX'),

  bottomRightY: function() {
    return this.get('spriteSheet.tileHeight') + this.get('topLeftY');
  }.property('spriteSheet', 'topLeftY'),

  renderToCanvasCtx: function(canvasCtx) {
    var topLeftX         = this.get('topLeftX'),
        topLeftY         = this.get('topLeftY'),
        tileWidth         = this.get('tileWidth'),
        tileHeight        = this.get('tileHeight'),
        spriteSheet       = this.get('spriteSheet'),
        spriteSheetImage  = spriteSheet.get('image'),
        spriteSheetCoords = spriteSheet.keyFrameCoords(this.get('direction'));

    canvasCtx.drawImage(spriteSheetImage,
      spriteSheetCoords.x, spriteSheetCoords.y, tileWidth, tileHeight,
      topLeftX, topLeftY, tileWidth, tileHeight);

    return;
  },

  hasCollision: function(entity) {
    var topLeftX        = this.get('topLeftX'),
        topLeftY        = this.get('topLeftY'),
        tileWidth        = this.get('tileWidth'),
        tileHeight       = this.get('tileHeight'),
        entityTopLeftX  = entity.get('topLeftX'),
        entityTopLeftY  = entity.get('topLeftY'),
        entityTileWidth  = entity.get('tileWidth'),
        entityTileHeight = entity.get('tileHeight'),
        xCollision       = false,
        yCollision       = false;

    if (this.get('content') === entity.get('content')) {
      return false;
    } else {
      if (topLeftX < entityTopLeftX) {
        xCollision = ((entityTopLeftX - topLeftX) < tileWidth);
      } else {
        xCollision = ((topLeftX - entityTopLeftX) < entityTileWidth);
      }

      if (topLeftY < entityTopLeftY) {
        yCollision = ((entityTopLeftY - topLeftY) < tileHeight);
      } else {
        yCollision = ((topLeftY - entityTopLeftY) < entityTileHeight);
      }

      return (xCollision && yCollision);
    }
  }
});
