var AreaSerializer = DS.RESTSerializer.extend({
    serializeHasMany: function(record, json, relationship) {
        var key = relationship.key;

        if (key === "players") {
            json[key] = record.get("players").map(function(player) {
                return player.get("id");
            });
        } else {
            this._super.apply(this, arguments);
        }
    }
});

export default AreaSerializer;
