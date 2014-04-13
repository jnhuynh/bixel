import GameInteractionWalkController from "app/controllers/game/interaction/walk";

// Handles all of the interactions associated with the player of this
// game.
//
// - Updating Direction
// - Updating Position
// - Detecting Collisions
var GameInteractionView =  Ember.View.extend({
    tagName: "div",
    attributeBindings: "tabIndex".w(),

    tabIndex: 0,

    game:    null,
    area:    Ember.computed.alias("game.area"),
    player:  Ember.computed.alias("game.player"),
    walkController: function() {
        return GameInteractionWalkController.create({
            content: this.get("player")
        });
    }.property("player"),

    didInsertElement: function() {
        var element = $(this.get("element")),
            area    = this.get("area");

        element.css("width", area.get("width"));
        element.css("height", area.get("height"));
        element.css("position", "absolute");
        element.css("z-index", 10);
    },

    keyDown: function(evt) {
        var walkController = this.get("walkController");

        walkController.walk(evt);
    }
});

export default GameInteractionView;
