//= require jquery
//= require environment
//= require ember-appkit
//= require_self
//= require adapter
//= require router
//= require websocket_rails/main
//= require_tree ../app
//= require_tree ../vendor/assets/javascripts
//= require_tree ./initializers

window.App = require('app').default.create();
