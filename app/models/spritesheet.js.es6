var attr      = DS.attr,
    hasMany   = DS.hasMany,
    belongsTo = DS.belongsTo;

var Spritesheet = DS.Model.extend({
    name:                attr("string"),
    src:                 attr("string"),

    width:               attr("number"),
    height:              attr("number"),
    frameWidth:          attr("number"),
    frameHeight:         attr("number"),

    frameColumns:        attr("number"),
    frameRows:           attr("number"),
    currentFrameColumn:  attr("number"),
    currentFrameRow:     attr("number"),

    player:              belongsTo("player")
});

export default Spritesheet;
