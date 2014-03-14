import Rectangle from "app/models/rectangle";

var attr      = DS.attr,
    hasMany   = DS.hasMany,
    belongsTo = DS.belongsTo;

var Entity = DS.Model.extend({
    name:         attr("string"),
    x:            attr("number"),
    y:            attr("number"),
    direction:    attr("string"),

    area:         belongsTo("area"),
    spritesheet:  belongsTo("spritesheet"),

    step: 5, // Stride Distance

    rectangle: function() {
        return Rectangle.create({
            x1:      this.get("x"),
            y1:      this.get("y"),
            width:   this.get("spritesheet.frameWidth"),
            height:  this.get("spritesheet.frameHeight")
        });
    }.property("spritesheet.frameWidth", "spritesheet.frameHeight", "x", "y"),

    collidesWith: function(otherRectangle) {
        var thisRectangle = this.get("rectangle");

        return thisRectangle.isInside(otherRectangle);
    }
});

export default Entity;
