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
    }.observes("selectedArea", "selectedPlayer")
});

export default SelectionMenuController;
