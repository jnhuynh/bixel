var SelectOneComponent = Ember.Component.extend({
    actions: {
        selectChoice: function(choice) {
            this.set("selected", choice);
        }
    }
});

export default SelectOneComponent;
