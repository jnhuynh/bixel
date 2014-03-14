// import Rectangle from "appkit/models/rectangle";

// Handles all of the interactions associated with the player of this
// game.
//
// - Updating Direction
// - Updating Position
// - Detecting Collisions
var GameInteractionView =  Ember.View.extend({
    tagName: "div",
    attributeBindings: "tabIndex".w(),

    area:    null,
    player:  null,

    tabIndex: 0,

    didInsertElement: function() {
        var element = $(this.get("element")),
            area    = this.get("area");

        element.css("width", area.get("width"));
        element.css("height", area.get("height"));
        element.css("position", "absolute");
        element.css("z-index", 10);
    },

    updateDirection: function(keyCode) {
        // jQuery event.which key codes
        // ------------------------------
        // up    = 38
        // down  = 40
        // left  = 37
        // right = 39
        // up    = w = 87
        // down  = a = 83
        // left  = s = 65
        // right = f = 68
        switch(keyCode) {
        case 38:
        case 87:
            this.set("player.direction", "up");
            break;
        case 40:
        case 83:
            this.set("player.direction", "down");
            break;
        case 37:
        case 65:
            this.set("player.direction", "left");
            break;
        case 39:
        case 68:
            this.set("player.direction", "right");
            break;
        }
    },

    updatePosition: function() {
        var newX,
            newY,
            rectangle,
            collisions,
            // entities  = this.get("entities"),
            player    = this.get("player"),
            direction = player.get("direction"),
            x         = player.get("x"),
            y         = player.get("y"),
            width     = player.get("width"),
            height    = player.get("height");

        switch(direction) {
        case "up":
            newY = y - 1;
            newX = x;
            break;
        case "down":
            newY = y + 1;
            newX = x;
            break;
        case "left":
            newX = x - 1;
            newY = y;
            break;
        case "right":
            newX = x + 1;
            newY = y;
            break;
        }

        // rectangle = Rectangle.create({
            // x1:      newX,
            // y1:      newY,
            // width:   width,
            // height:  height
        // });

        // collisions = entities.filter(function(entity) {
            // return entity.collidesWith(rectangle);
        // });

        player.set("x", newX);
        player.set("y", newY);
    },

    keyDown: function(evt) {
        this.updateDirection(evt.which);
        this.updatePosition();
    }
});

export default GameInteractionView;
