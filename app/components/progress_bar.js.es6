export default Ember.Component.extend({
  classNames: 'component-progress-bar'.w(),

  /**
   * current, max, label are passed in from wrapping template
   */
  current:  null,
  max:      null,
  min:      0,

  percent: function() {
    var current = this.get('current'),
        max     = this.get('max'),
        percent = Math.floor(current / max) * 100;

    return percent;
  }.property('max', 'current'),

  widthString: function() {
    var percent = this.get('percent').toString() + '%';

    return 'width:' + percent + ';';
  }.property('percent')
});
