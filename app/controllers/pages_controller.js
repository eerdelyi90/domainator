var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , User       = require('../models').User
  , bcrypt     = require('bcrypt-nodejs');

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Dashboard';
  this.stuff ='stuff';
  // User.
  this.username = 'username';
  this.render();
}


PagesController.error404 = function() {
  this.res.status(404);
  this.render();
}

module.exports = PagesController;
