var GameView = Ember.View.extend({
    templateName: "game",

    // Passed in via template context
    area:      null,
    entities:  Ember.computed.alias("area.entities")
});

export default GameView;
