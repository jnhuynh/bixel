var SelectionMenuController = Ember.Controller.extend({
    selectedPlayer:  null,
    selectedArea:    null,

    handleStartGameButton: function() {
        var nextLi = $("#start-game").parent();

        if (!!this.get("selectedArea") && !!this.get("selectedPlayer")) {
            nextLi.removeClass("disabled");
        } else {
            nextLi.addClass("disabled");
        }
    }.observes("selectedArea", "selectedPlayer")
});

export default SelectionMenuController;
