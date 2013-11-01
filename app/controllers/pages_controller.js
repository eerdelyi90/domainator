var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Dashboard';
  this.stuff ='stuff';
  this.render();
}
PagesController.domains = function() {
  this.title = 'domains';
  this.stuff ='domains';
  this.render();
}
PagesController.settings = function() {
  this.title = 'settings';
  this.stuff ='settings';
  this.render();
}

module.exports = PagesController;
