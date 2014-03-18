import Rectangle from "app/models/rectangle";

var GameInteractionWalkController = Ember.ObjectController.extend({
    // Assigned via GameInteractionView
    content:             null, // Player
    frameColumns:        Ember.computed.alias("spritesheet.frameColumns"),
    frameRows:           Ember.computed.alias("spritesheet.frameRows"),
    currentFrameColumn:  Ember.computed.alias("spritesheet.currentFrameColumn"),
    currentFrameRow:     Ember.computed.alias("spritesheet.currentFrameRow"),

    isValidKeyCode: function(keyCode) {
        var valid = false;

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
        case 40:
        case 83:
        case 37:
        case 65:
        case 39:
        case 68:
            valid = true;
            break;
        }

        return valid;
    },

    determineDirection: function(keyCode) {
        var newDirection = this.get("direction");

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
        var step = this.get("step"),
            x    = this.get("x"),
            y    = this.get("y"),
            newX = x,
            newY = y;

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

    determineCurrentFrameColumn: function() {
        var currentFrameColumn = this.get("currentFrameColumn"),
            frameColumns       = this.get("frameColumns");

        // Bump currentFrameColumn for animation
        return ((currentFrameColumn + 1) % frameColumns);
    },

    determineCurrentFrameRow: function(direction) {
        var currentFrameRow = this.get("currentFrameRow"),
            frameRows       = this.get("frameRows");

        switch (direction) {
        case "up":
            currentFrameRow = 0;
            break;
        case "down":
            currentFrameRow = 1;
            break;
        case "left":
            currentFrameRow = 2;
            break;
        case "right":
            currentFrameRow = 3;
            break;
        }

        return currentFrameRow;
    },


    walk: function(evt) {
        var keyCode = evt.which;

        if (this.isValidKeyCode(keyCode)) {
            var direction          = this.determineDirection(keyCode),
                position           = this.determinePosition(direction),
                currentFrameColumn = this.determineCurrentFrameColumn(),
                currentFrameRow    = this.determineCurrentFrameRow(direction);

            this.set("direction", direction);
            this.set("x", position.x);
            this.set("y", position.y);
            this.set("currentFrameColumn", currentFrameColumn);
            this.set("currentFrameRow", currentFrameRow);

            this.get("model").save();
        }
    }
});

export default GameInteractionWalkController;
