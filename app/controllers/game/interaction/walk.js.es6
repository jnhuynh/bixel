import Rectangle from "app/models/rectangle";

var GameInteractionWalkController = Ember.ObjectController.extend({
    // Assigned via GameInteractionView
    content:  null, // Player

    determineDirection: function(keyCode) {
        var newDirection;

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
            newDirection = "up";
            break;
        case 40:
        case 83:
            newDirection = "down";
            break;
        case 37:
        case 65:
            newDirection = "left";
            break;
        case 39:
        case 68:
            newDirection = "right";
            break;
        }

        return newDirection;
    },

    determinePosition: function(direction) {
        var newX,
            newY,
            step      = this.get("step"),
            x         = this.get("x"),
            y         = this.get("y");

        switch(direction) {
        case "up":
            newY = y - step;
            newX = x;
            break;
        case "down":
            newY = y + step;
            newX = x;
            break;
        case "left":
            newX = x - step;
            newY = y;
            break;
        case "right":
            newX = x + step;
            newY = y;
            break;
        }

        return { x: newX, y: newY };
    },

    walk: function(evt) {
        var direction = this.determineDirection(evt.which),
            position  = this.determinePosition(direction);

        this.set("direction", direction);
        this.set("x", position.x);
        this.set("y", position.y);

        // Persist to backend
        this.get("model").save();
    }
});

export default GameInteractionWalkController;
