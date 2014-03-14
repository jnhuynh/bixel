var Rectangle = Ember.Object.extend({
    // Overrideable Properties
    //--------------------
    // Top Left
    x1: 0,
    y1: 0,

    width:   32,
    height:  32,
    //--------------------

    // Bottom Right
    x2: function() {
        return this.get("x1") + this.get("width");
    }.property("width"),

    y2: function() {
        return this.get("y1") + this.get("height");
    }.property("height"),

    withinX: function(otherRectangle) {
        var x1 = this.get("x1"),
            x2 = this.get("x2"),
            xA = otherRectangle.get("x1"),
            xB = otherRectangle.get("x2");

        // Rectangle
        //--------------------
        // 0,0
        //
        //     x1     x2
        //     |------|
        //  xA |  xB  |
        //  |--|--|   |
        //  |  |  |   |
        //  |--|--|   |
        //     |------|
        //
        //              10,10
        //--------------------
        var insideFromLeft = ((x1 >= xA) && (x1 < xB));

        // Rectangle
        //--------------------
        // 0,0
        //
        //   x1    x2
        //   |------|
        //   |   xA |  xB
        //   |   |--|--|
        //   |   |  |  |
        //   |   |--|--|
        //   |------|
        //
        //              10,10
        //--------------------
        var insideFromRight = ((x2 > xA) && (x2 <= xB));

        return insideFromLeft || insideFromRight;
    },

    withinY: function(otherRectangle) {
        var y1 = this.get("y1"),
            y2 = this.get("y2"),
            yA = otherRectangle.get("y1"),
            yB = otherRectangle.get("y2");

        // Rectangle
        //--------------------
        // 0,0
        //
        //  yA|------------|
        //    |y1|------|  |
        //    |  |      |  |
        //  yB|------------|
        //       |      |
        //     y2|------|
        //
        //              10,10
        //--------------------
        var insideFromTop = ((y1 >= yA) && (y1 < yB));

        // Rectangle
        //--------------------
        // 0,0
        //
        //
        //     y1|------|
        //       |      |
        //  yA|------------|
        //    |  |      |  |
        //    |y2|------|  |
        //  yB|------------|
        //
        //              10,10
        //--------------------
        var insideFromBottom = ((y2 > yA) && (y2 <= yB));

        return insideFromTop || insideFromBottom;
    },

    isInside: function(otherRectangle) {
        return (this.withinX(otherRectangle) && this.withinY(otherRectangle));
    }
});

export default Rectangle;
