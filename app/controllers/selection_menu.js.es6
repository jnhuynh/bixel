var SelectionMenuController = Ember.Controller.extend({
    selectedPlayer:  null,
    selectedArea:    null,

    handleStartGameButton: function() {
        var button = $("#start-game");

        if (!!this.get("selectedArea") && !!this.get("selectedPlayer")) {
            button.removeAttr("disabled");
        } else {
            button.attr("disabled", "disabled");
        }
    }.observes("selectedArea", "selectedPlayer"),


    actions: {
        startGame: function() {
            var selectedArea   = this.get("selectedArea"),
                selectedPlayer = this.get("selectedPlayer");

            if (!!selectedArea && !!selectedPlayer) {
                console.log("transition happens here.");
            }
        }
    }
});

export default SelectionMenuController;
