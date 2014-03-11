var attr      = DS.attr,
    hasMany   = DS.hasMany,
    belongsTo = DS.belongsTo;

var Entity = DS.Model.extend({
    name:         attr("string"),
    x:            attr("number"),
    y:            attr("number"),
    direction:    attr("string"),

    area:         belongsTo("area"),
    spritesheet:  belongsTo("spritesheet")
});

export default Entity;
