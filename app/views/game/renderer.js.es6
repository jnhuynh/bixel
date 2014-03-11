var GameRendererView = Ember.View.extend({
    templateName: "game/renderer",

    canvas:     null,
    canvasCtx:  null,

    // Passed in via template context
    area:      null,
    entities:  null,

    // Canvas and Render
    lastTimestamp:   null,
    renderCanvasID:  null,
    renderCanvas: function() {
        var _this = this;
        var lastX = 0,
            lastY = 0;

        return function step(timestamp) {
            if (!_this.get("isDestroyed")) {
                var delta,
                    entities      = _this.get("entityRenderControllers"),
                    canvasCtx     = _this.get("canvasCtx"),
                    lastTimestamp = _this.get("lastTimestamp");

                // Clear the canvas
                canvasCtx.clearRect(0, 0, 500, 500);

                // Draw stuff
                if (entities) {
                    entities.forEach(function(entity) {
                        entity.render(canvasCtx);
                    });
                }

                // Queue the next animation frame
                _this.set("lastTimestamp", timestamp);
                window.requestAnimationFrame(step);
            }
        };
    }.property(),

    // Canvas Setup
    didInsertElement: function() {
        var element        = this.get("element"),
            canvas         = $(".game-renderer", element),
            canvasCtx      = canvas[0].getContext("2d"),
            area           = this.get("area"),
            renderCanvas   = this.get("renderCanvas"),
            renderCanvasID = window.requestAnimationFrame(renderCanvas);

        canvas.attr("width", area.get("width"));
        canvas.attr("height", area.get("height"));

        this.set("canvas", canvas);
        this.set("canvasCtx", canvasCtx);
        this.set("renderCanvasID", renderCanvasID);
    },

    willDestroyElement: function() {
        window.cancelAnimationFrame(this.get("renderCanvasID"));
    }
});

export default GameRendererView;
