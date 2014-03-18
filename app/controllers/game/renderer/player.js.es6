// Meant to be instantiated at by GameRendererView
var GameRendererPlayerController = Ember.ObjectController.extend({
    // Assigned via GameRendererView
    content:             null, // Player
    frameHeight:         Ember.computed.alias("spritesheet.frameHeight"),
    frameWidth:          Ember.computed.alias("spritesheet.frameWidth"),
    frameColumns:        Ember.computed.alias("spritesheet.frameColumns"),
    frameRows:           Ember.computed.alias("spritesheet.frameRows"),
    currentFrameColumn:  Ember.computed.alias("spritesheet.currentFrameColumn"),
    currentFrameRow:     Ember.computed.alias("spritesheet.currentFrameRow"),

    spritesheetImage: function() {
        // There is a delay from when we create this controller
        // and when the player's spritesheet is fully initialized.
        //
        // We return null until src is something useful.
        if (!this.get("spritesheet.src")) {
            return null;
        }

        var spritesheetImage = new Image();

        spritesheetImage.src = this.get("spritesheet.src");
        this.set("spritesheetImage", spritesheetImage);
    }.property("spritesheet.src"),

    // Animation
    // ----------------
    //
    // M frame x 4 frame spritesheet image
    //
    // Each row is a set of keyframes for a direction
    render: function(canvasCtx) {
        // Hold off on render until the spritesheet model is loaded
        if (!this.get("spritesheetImage")) {
            return;
        }

        var playerX            = this.get("x"),
            playerY            = this.get("y"),
            frameWidth         = this.get("frameWidth"),
            frameHeight        = this.get("frameHeight"),
            direction          = this.get("direction"),
            currentFrameRow    = this.get("currentFrameRow"),
            currentFrameColumn = this.get("currentFrameColumn"),
            spritesheetImage   = this.get("spritesheetImage"),
            spritesheetX       = frameWidth * this.get("currentFrameColumn"),
            spritesheetY       = frameHeight * this.get("currentFrameRow");

        canvasCtx.drawImage(spritesheetImage,
            spritesheetX, spritesheetY, frameWidth, frameHeight,
            playerX, playerY, frameWidth, frameHeight);
    }
});

export default GameRendererPlayerController;
