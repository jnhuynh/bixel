import GameRendererPlayerController from "app/controllers/game/renderer/player";
import Player from "app/models/player";

var GameRendererView = Ember.View.extend({
    tagName: "canvas",
    attributeBindings: "width height".w(),

    width:   Ember.computed.alias("area.width"),
    height:  Ember.computed.alias("area.height"),

    // Passed in via template context
    game:     null,
    area:     Ember.computed.alias("game.area"),
    players:  function() {
        // Wrap player models with appropriate render controllers
        var players = this.get("area.players").map(function(player) {
            if (player instanceof Player) {
                return GameRendererPlayerController.create({
                    content: player
                });
            }
        });

        return players;
    }.property("area.players"),

    // Canvas and Render
    canvasCtx:       null,
    lastTimestamp:   null,
    renderCanvasID:  null,
    renderCanvas:    function() {
        var _this = this;
        var lastX = 0,
            lastY = 0;

        return function step(timestamp) {
            if (!_this.get("isDestroyed")) {
                var delta,
                    players       = _this.get("players"),
                    canvasCtx     = _this.get("canvasCtx"),
                    lastTimestamp = _this.get("lastTimestamp"),
                    width         = _this.get("width"),
                    height        = _this.get("height");

                // Clear the canvas
                canvasCtx.clearRect(0, 0, width, height);

                // Draw stuff
                if (players) {
                    players.forEach(function(player) {
                        player.render(canvasCtx);
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
        var element        = $(this.get("element")),
            canvasCtx      = element[0].getContext("2d"),
            renderCanvas   = this.get("renderCanvas"),
            renderCanvasID = window.requestAnimationFrame(renderCanvas);

        element.css("position", "absolute");
        element.css("z-index", 1);

        this.set("canvasCtx", canvasCtx);
        this.set("renderCanvasID", renderCanvasID);
    },

    willDestroyElement: function() {
        window.cancelAnimationFrame(this.get("renderCanvasID"));
    }
});

export default GameRendererView;
