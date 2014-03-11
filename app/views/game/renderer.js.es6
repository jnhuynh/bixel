var GameRendererView = Ember.View.extend({
    templateName: "game/renderer",

    canvas:     null,
    canvasCtx:  null,

    didInsertElement: function() {
        var element   = this.get("element"),
            canvas    = $(".game-renderer", element),
            canvasCtx = canvas[0].getContext("2d"),
            area      = this.get("area");

        canvas.attr("width", area.get("width"));
        canvas.attr("height", area.get("height"));

        this.set("canvas", canvas);
        this.set("canvasCtx", canvasCtx);
    }
});

export default GameRendererView;
