var attr      = DS.attr,
    hasMany   = DS.hasMany,
    belongsTo = DS.belongsTo;

var Area = DS.Model.extend({
    name:    attr("string"),
    width:   attr("number"),
    height:  attr("number"),
    players: hasMany("player")
});

export default Area;
