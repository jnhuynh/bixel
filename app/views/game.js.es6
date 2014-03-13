var GameView = Ember.View.extend({
    templateName: "game",

    // Passed in via template context
    area:    null,
    player:  null,

    didInsertElement: function() {
        var gameContainer = $("#game-container", this.get("element")),
            area          = this.get("area");

        gameContainer.css("width", area.get("width"));
        gameContainer.css("height", area.get("height"));
        gameContainer.css("position", "relative");
    },

});

export default GameView;
